import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GuestIcon from "../assets/svg/GuestIcon.svg";
import UploadIcon from "../assets/svg/upload-icon.svg";
import GuestLayout from "../layouts/GuestLayout.jsx";
import { predictTrash } from "../services/predictService.jsx";

const GuestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const triggerUpload = (id) => {
    document.getElementById(id)?.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setError(null);
      setPrediction(null);
    }
  };

  const handlePrediction = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      setError(null);
      const result = await predictTrash(selectedFile);
      setPrediction(result);

      // Show trial limit message after successful prediction
      setTimeout(() => {
        setError(
          "This was your free trial. Please login to continue using this feature."
        );
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const useParam = params.get("use");

    if (useParam) {
      // Trigger function based on query value
      if (useParam === "camera") {
        triggerUpload("cameraInput");
      } else if (useParam === "upload") {
        triggerUpload("uploadInput");
      }

      // Clean URL parameters
      params.delete("use");
      const newUrl = `${window.location.pathname}${
        params.toString() ? `?${params.toString()}` : ""
      }`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [location]);

  const renderDesktopView = () => (
    <div className="hidden md:flex flex-col items-center justify-center w-full md:w-1/2 space-y-6">
      {!imagePreview && (
        <>
          <label className="w-full max-w-lg h-56 bg-white flex flex-col items-center justify-center border-1 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-500">
            <img src={UploadIcon} alt="Upload" />
            <p className="text-gray-500">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-400 mt-2">
              PNG, JPEG, or JPG (max: 5MB)
            </p>
            <input
              id="desktopUpload"
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={handlePrediction}
            disabled={!selectedFile || loading}
            className={`w-full max-w-lg text-white px-6 py-2 rounded-lg transition 
              ${
                selectedFile && !loading
                  ? "bg-primary hover:bg-primary/90"
                  : "bg-[#A2A2A2] cursor-not-allowed"
              }`}
          >
            {loading ? "Memindai..." : "Pindai"}
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </>
      )}
    </div>
  );

  const renderPreview = () =>
    imagePreview && (
      <div className="absolute flex items-center justify-center pt-8">
        <div className="flex flex-col items-center space-y-6 px-4">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-[358px] h-[548px] object-cover rounded-[10px] shadow-md"
          />
          {prediction && (
            <>
              <span className="w-[155px] h-[39px] flex items-center justify-center bg-[#FFD600] text-white font-medium rounded-[30px]">
                {prediction.type}
              </span>
              <p className="text-sm text-center">
                Lihat{" "}
                <span
                  onClick={() =>
                    navigate(
                      `/panduan?sampah=${prediction.type
                        .toLowerCase()
                        .replace("sampah ", "")}`
                    )
                  }
                  className="text-primary font-semibold underline cursor-pointer"
                >
                  TrashGuide
                </span>{" "}
                untuk sampah jenis ini
              </p>
            </>
          )}
          {!prediction && !error && (
            <button
              onClick={handlePrediction}
              disabled={loading}
              className={`w-[155px] text-white px-6 py-2 rounded-[30px] transition
                ${loading ? "bg-[#A2A2A2]" : "bg-primary hover:bg-primary/90"}`}
            >
              {loading ? "Memindai..." : "Pindai"}
            </button>
          )}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
      </div>
    );

  return (
    <GuestLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl space-y-10 md:space-y-0 md:space-x-10">
          {!imagePreview && (
            <div className="flex flex-col items-center space-y-4 w-full md:w-1/2 text-center">
              <img
                src={GuestIcon}
                alt="Guest Icon"
                className="w-64 md:w-auto mx-auto"
              />
              <p className="text-black-light text-[16px] font-medium sm:text-lg leading-tight px-4">
                Kenali jenis sampahmu dengan cepat, pindai dengan mengunggah
                dari galeri untuk proses klasifikasi.
              </p>
            </div>
          )}

          {!imagePreview && (
            <div className="flex md:hidden flex-col items-center w-full space-y-4">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
                id="cameraInput"
              />

              <button
                onClick={() => triggerUpload("cameraInput")}
                className="w-full max-w-xs bg-primary text-white px-6 py-3 rounded-lg"
              >
                Ambil Photo
              </button>

              <p className="text-sm text-gray-500">atau</p>

              <button
                className="w-full max-w-xs bg-primary text-white px-6 py-3 rounded-xl flex items-center justify-center space-x-2"
                onClick={() => triggerUpload("uploadInput")}
              >
                <span>Unggah Photo</span>
              </button>
              <input
                id="uploadInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}

          {renderDesktopView()}
          {renderPreview()}
        </div>
      </div>
    </GuestLayout>
  );
};

export default GuestPage;
