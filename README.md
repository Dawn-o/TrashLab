> 🌿 CC25-SF015 — Capstone Project — Green Economy & Green Jobs Theme

### Deskripsi
TrashLab adalah solusi berbasis AI untuk klasifikasi sampah organik dan anorganik dari gambar. Proyek ini menggunakan model CNN dengan TensorFlow/Keras, frontend React + Vite, dan backend Laravel.

### Struktur Repository
Repository ini terdiri dari tiga bagian:

```
trashlab/
├── frontend/    # Frontend React (Vite)
├── backend/     # Backend Laravel (REST API)
└── models/      # Model AI TensorFlow (Serving Ready)
```

### Teknologi yang Digunakan
- **Frontend**: React.js + Vite
- **Backend**: Laravel (REST API)
- **Model AI**: TensorFlow/Keras (CNN), served via TensorFlow Serving + Ngrok
- **Deployment**:
  - Frontend: Vercel
  - Backend: VPS/Server Pribadi
  - Model: TensorFlow Serving (Ngrok)

### Cara Menjalankan Lokal
#### 1. Clone Repo
```bash
git clone --recurse-submodules https://github.com/Dawn-o/trashlab.git
cd trashlab
```

#### 2. Menjalankan Backend
```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

#### 3. Menjalankan Frontend
```bash
cd ../frontend
npm install
npm run dev -- --host
```

#### 4. Struktur Branch
Seluruh repo menggunakan struktur branch:
- `main`: branch utama untuk production-ready code.

---

## 🚀 Cara Menjalankan API di Google Colab

### 1. Clone atau buka notebook di Google Colab

Buka file notebook yang berisi script FastAPI, misalnya `serve_model_fastapi.ipynb`.

### 2. Install Dependencies

```bash
!pip install -r requirements.txt
```

### 3. Mount Google Drive

```python
from google.colab import drive
drive.mount('/content/drive')
```

Pastikan model disimpan dalam format `SavedModel` pada path berikut:

```
/content/drive/MyDrive/saved_model_trashlab/
```

### 4. Jalankan Server FastAPI

Server akan:
- Load model menggunakan `TFSMLayer`
- Menyediakan endpoint POST `/predict`
- Buka dokumentasi Swagger di `/docs`

### 5. Expose Server dengan Ngrok

```python
from pyngrok import ngrok
ngrok.set_auth_token("TOKEN_NGROK_KAMU")
public_url = ngrok.connect(8000).public_url
print(f"🌍 API dapat diakses di: {public_url}/docs")
```

Contoh output:
```
🌍 API dapat diakses di: https://xxxxxx.ngrok-free.app/docs
```

### 6. Endpoint Prediksi

**Endpoint:**
```
POST /predict
```

**Form Data:**
- `file` (image): File gambar (organik atau anorganik)

**Response:**
```json
{
  "label": "Organik",
  "confidence": 0.9823,
  "response_time": 0.345
}
```

**Deployed Site:** [https://trashlab.vercel.app](https://trashlab.vercel.app)

**Dataset:** [Waste Classification | Kaggle](https://www.kaggle.com/datasets/techsash/waste-classification-data)

**Video Presentation:** [YouTube Link (Unlisted)](https://linknanti)

**Presentation Slides:** [Canva Slides Link](https://link)
