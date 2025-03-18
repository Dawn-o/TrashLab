import tensorflow as tf
import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import nest_asyncio
import uvicorn
import threading
from pyngrok import ngrok

# Buat instance FastAPI
app = FastAPI()

# Muat model inference menggunakan TFSMLayer (pastikan folder "saved_model_trashlab" sudah ada di Colab)
try:
    loaded_model = tf.keras.layers.TFSMLayer("saved_model_trashlab", call_endpoint="serving_default")
    print("Model berhasil dimuat untuk inference.")
except Exception as e:
    print("Gagal memuat model:", e)

# Fungsi untuk memproses gambar dari file bytes
def preprocess_image_bytes(image_bytes: bytes):
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("Gagal membaca gambar.")
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (224, 224))
    img = img / 255.0
    img = np.expand_dims(img, axis=0).astype(np.float32)
    return img

# Endpoint untuk prediksi
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File harus berupa gambar.")

    image_bytes = await file.read()

    try:
        img = preprocess_image_bytes(image_bytes)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    prediction = loaded_model(img)

    if isinstance(prediction, dict):
        prediction = list(prediction.values())[0]
    if isinstance(prediction, tf.Tensor):
        prediction = prediction.numpy()

    label = "Organik" if prediction[0][0] < 0.5 else "Anorganik"
    confidence = 1 - prediction[0][0] if label == "Organik" else prediction[0][0]

    return JSONResponse(content={"label": label, "confidence": float(confidence)})

# Patch event loop agar bisa digunakan di Colab
nest_asyncio.apply()

# Fungsi untuk menjalankan server FastAPI
def run_app():
    uvicorn.run(app, host="0.0.0.0", port=3000)

# Jalankan server dalam thread background
thread = threading.Thread(target=run_app, daemon=True)
thread.start()

ngrok.set_auth_token("2uOGu0Ww4EWrhAAiP2ikzToKtaJ_2dEUdCvihakbGFdmuqy5V")

# Buka tunnel ngrok ke port 10000
public_url = ngrok.connect(3000).public_url
print("Aplikasi FastAPI sudah berjalan!")
print("Public URL (Swagger UI):", public_url)

