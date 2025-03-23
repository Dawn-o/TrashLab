import tensorflow as tf
import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.responses import JSONResponse
import nest_asyncio
import uvicorn
import threading
from pyngrok import ngrok
from loguru import logger
import time
import psutil
import requests
from fastapi.middleware.cors import CORSMiddleware
from google.colab import drive
import os

# Mount Google Drive
drive.mount('/content/drive')

# Setup logger
logger.add("app.log", rotation="1 day", level="INFO")

# Buat instance FastAPI
app = FastAPI()

# Middleware untuk CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path ke model di Google Drive (ganti dengan path yang sesuai)
MODEL_PATH = "/content/drive/MyDrive/saved_model_trashlab"

# Load model dari Google Drive
try:
    loaded_model = tf.keras.layers.TFSMLayer(MODEL_PATH, call_endpoint="serving_default")
    logger.info("✅ Model berhasil dimuat dari Google Drive.")
except Exception as e:
    logger.error(f"❌ Error saat load model: {e}")

# Fungsi untuk memproses gambar dari file bytes
def preprocess_image_bytes(image_bytes: bytes):
    try:
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None:
            raise ValueError("Gagal membaca gambar.")
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = cv2.resize(img, (224, 224))
        img = img / 255.0
        img = np.expand_dims(img, axis=0).astype(np.float32)
        return img
    except Exception as e:
        logger.error(f"⚠ Error dalam preprocessing gambar: {e}")
        raise

# Cek status ngrok
def check_ngrok_status():
    try:
        ngrok_tunnels = requests.get("http://127.0.0.1:4040/api/tunnels").json()
        if ngrok_tunnels.get("tunnels"):
            logger.info(f"🔗 Ngrok aktif di {ngrok_tunnels['tunnels'][0]['public_url']}")
        else:
            logger.warning("⚠ Ngrok tidak berjalan.")
    except Exception as e:
        logger.error(f"❌ Error cek status ngrok: {e}")

# Cek Port
def is_port_in_use(port=8000):
    """Cek apakah port sudah digunakan"""
    for conn in psutil.net_connections():
        if conn.laddr.port == port:
            return True
    return False

# Monitoring CPU & Memory
def log_system_usage():
    cpu_percent = psutil.cpu_percent()
    memory_percent = psutil.virtual_memory().percent
    logger.info(f"💾 CPU Usage: {cpu_percent}%, Memory Usage: {memory_percent}%")

@app.post("/predict")
async def predict(request: Request, file: UploadFile = File(...)):
    start_time = time.time()
    logger.info(f"📥 Request dari {request.client.host} - Upload file: {file.filename}")

    if not file.content_type.startswith("image/"):
        logger.warning("⚠ Request dengan format file tidak valid")
        raise HTTPException(status_code=400, detail="File harus berupa gambar.")

    image_bytes = await file.read()

    try:
        img = preprocess_image_bytes(image_bytes)
    except Exception as e:
        logger.error(f"⚠ Preprocessing gagal: {e}")
        raise HTTPException(status_code=500, detail=str(e))

    try:
        prediction = loaded_model(img)

        if isinstance(prediction, dict):
            prediction = list(prediction.values())[0]
        if isinstance(prediction, tf.Tensor):
            prediction = prediction.numpy()

        label = "Organik" if prediction[0][0] < 0.5 else "Anorganik"
        confidence = 1 - prediction[0][0] if label == "Organik" else prediction[0][0]

        response_time = time.time() - start_time
        logger.info(f"✅ Prediksi: {label}, Confidence: {confidence:.4f}, Waktu Response: {response_time:.4f} detik")

        log_system_usage()

        return JSONResponse(content={"label": label, "confidence": float(confidence), "response_time": response_time})

    except Exception as e:
        logger.error(f"❌ Error saat inferensi model: {e}")
        raise HTTPException(status_code=500, detail="Terjadi kesalahan dalam proses prediksi.")

# Patch event loop agar bisa digunakan di Colab
nest_asyncio.apply()

# Jalankan server di thread terpisah
def run_app():
    uvicorn.run(app, host="0.0.0.0", port=8000)

if not is_port_in_use(8000):
    thread = threading.Thread(target=run_app, daemon=True)
    thread.start()
else:
    logger.info("⚠ Server sudah berjalan di port 8000, tidak perlu start ulang.")

# Setup ngrok
ngrok.set_auth_token("YOUR_NGROK_AUTH_TOKEN")  # Ganti dengan token ngrok
public_url = ngrok.connect(8000).public_url
logger.info(f"🌍 Aplikasi FastAPI sudah berjalan di {public_url}")

# Tampilkan URL ngrok
print(f"🌍 API dapat diakses di: {public_url}/docs")
