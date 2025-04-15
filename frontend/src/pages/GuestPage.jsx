import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GuestIcon from "../assets/svg/GuestIcon.svg";
import UploadIcon from "../assets/svg/upload-icon.svg";
import GuestLayout from "../layouts/GuestLayout.jsx";

const GuestPage = () => {
  const location = useLocation();
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const triggerUpload = (id) => {
    document.getElementById(id)?.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
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

  return (
    <GuestLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 pt-8">
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

          {/* MOBILE VIEW */}
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

          {/* DESKTOP VIEW */}
          <div className="hidden md:flex flex-col items-center justify-center w-full md:w-1/2 space-y-6">
            {!imagePreview && (
              <>
                <label className="w-full max-w-lg h-56 bg-white flex flex-col items-center justify-center border-1 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-500">
                  <img src={UploadIcon} alt="Upload" />
                  <p className="text-gray-500">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    PNG, JPEG, or JPG (max: 5MB)
                  </p>
                  <input
                    id="desktopUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                <button
                  className={`w-full max-w-lg text-white px-6 py-2 rounded-lg transition ${
                    selectedFile
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-[#A2A2A2] cursor-not-allowed"
                  }`}
                  disabled={!selectedFile}
                >
                  Pindai
                </button>
              </>
            )}
          </div>

          {/* PREVIEW */}
          {imagePreview && (
            <div className="absolute flex items-center justify-center pt-8">
              <div className="flex flex-col items-center space-y-6 px-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-[358px] h-[548px] object-cover rounded-[10px] shadow-md"
                />
                <span className="w-[155px] h-[39px] flex items-center justify-center bg-[#FFD600] text-white font-medium rounded-[30px]">
                  Sampah Anorganik
                </span>
                <p className="text-sm text-center">
                  Lihat{" "}
                  <span className="text-primary font-semibold underline cursor-pointer">
                    TrashGuide
                  </span>{" "}
                  untuk sampah jenis ini
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </GuestLayout>
  );
};

export default GuestPage;
