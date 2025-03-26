import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function UploadPage() {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(""); // Simpan nama file yang dipilih
  const navigate = useNavigate(); // Inisialisasi navigasi

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (
      selectedFile &&
      ["image/png", "image/jpeg", "image/jpg"].includes(selectedFile.type)
    ) {
      setPreview(URL.createObjectURL(selectedFile));
      setFileName(selectedFile.name); // Simpan nama file
    } else {
      alert("Hanya file PNG, JPG, dan JPEG yang diperbolehkan!");
    }

    // Reset input file agar bisa upload ulang
    event.target.value = "";
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 p-5 text-white">
      {/* Tombol Back */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-2 left-2 bg-white text-black px-4 py-2 rounded-lg shadow-lg hover:bg-gray-200"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Upload Gambar</h1>

      {/* Input Upload (Disembunyikan dan Diganti Label Kustom) */}
      <label className="cursor-pointer bg-blue-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-600">
        Pilih Gambar
        <input
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
        />
      </label>

      {/* Tampilkan Nama File Jika Ada */}
      {fileName && <p className="mt-2 text-sm text-gray-300">{fileName}</p>}

      {/* Preview Thumbnail */}
      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Preview"
            className="w-12 h-12 object-cover rounded-lg border border-gray-300 cursor-pointer hover:opacity-80"
          />
        </div>
      )}
    </div>
  );
}
