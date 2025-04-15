import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GuestIcon from "../assets/svg/GuestIcon.svg";
import MainLayout from "../layouts/MainLayout.jsx";
import axios from "../api/AxiosInstance.jsx";
import UploadIcon from "../assets/svg/upload-icon.svg";

const ScanPage = () => {
  const [images, setImages] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [use, setUse] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 3) {
      // Changed from 5 to 3
      setError("Maksimal 3 gambar yang dapat diunggah");
      return;
    }

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        setError("Format file tidak didukung");
        return false;
      }
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      if (!isValidSize) {
        setError("Ukuran file maksimal 5MB");
        return false;
      }
      return true;
    });

    const newImages = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
    setError(null);
  };

  const handlePrediction = async () => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images[]", image.file);
      });

      const response = await axios.post("/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPredictions(response.data.results);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memproses gambar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const useParam = params.get("use");

    if (useParam) {
      setUse(useParam);

      // Bersihkan param dari URL
      params.delete("use");
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  const handleTriggerUpload = (id) => {
    const inputElement = document.getElementById(id);
    if (inputElement) {
      inputElement.click();
    }
  };

  const renderPreview = () => (
    <div className="w-full max-w-6xl">
      <input
        id="uploadInput"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="hidden"
      />
      {/* Modified grid to center 1-3 images */}
      <div className="grid grid-cols-1 gap-6 place-items-center">
        <div
          className={`grid gap-6 w-full ${
            images.length === 1
              ? "grid-cols-1 max-w-md"
              : images.length === 2
              ? "grid-cols-2 max-w-2xl"
              : "grid-cols-3 max-w-6xl"
          }`}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center bg-white p-4 rounded-lg shadow w-full"
            >
              <div className="relative group">
                <img
                  src={image.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-[358px] h-[548px] object-cover rounded-lg"
                />
                {/* Only show delete button if there are no predictions */}
                {!predictions.length && (
                  <button
                    onClick={() => {
                      URL.revokeObjectURL(image.preview);
                      setImages((prev) => prev.filter((_, i) => i !== index));
                      setPredictions((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {predictions[index] && (
                <div className="mt-4 flex flex-col items-center space-y-4">
                  {/* Type Badge */}
                  <span
                    className={`px-4 py-2 text-white font-medium rounded-full ${
                      predictions[index].type.includes("Organik")
                        ? "bg-primary"
                        : "bg-yellow-400"
                    }`}
                  >
                    {predictions[index].type}
                  </span>

                  {/* Quest Progress */}
                  {index === 0 && predictions[0].quest_progress && (
                    <div className="w-full space-y-2 bg-gray-50 p-4 rounded-lg">
                      {Object.values(predictions[0].quest_progress.quests).map(
                        (quest, idx) => (
                          <div key={idx} className="flex flex-col">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">
                                {quest.name}
                              </span>
                              <span className="font-medium">
                                {quest.progress_text}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div
                                className="bg-primary rounded-full h-2 transition-all"
                                style={{
                                  width: `${
                                    (quest.current / quest.required) * 100
                                  }%`,
                                }}
                              />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* TrashGuide Link */}
                  <p className="text-sm text-center">
                    Lihat{" "}
                    <span
                      onClick={() =>
                        navigate(
                          `/panduan?sampah=${predictions[index].type
                            .toLowerCase()
                            .replace("sampah ", "")}`
                        )
                      }
                      className="text-primary font-semibold underline cursor-pointer"
                    >
                      TrashGuide
                    </span>{" "}
                    untuk jenis sampah ini
                  </p>

                  {/* Points Info - Moved to bottom */}
                  <p className="text-primary text-base font-semibold text-[16px]">
                    +{predictions[index].points_added} Poin Diperoleh
                  </p>
                  {predictions[index].bonus_points > 0 && (
                    <p className="text-xs text-green-600">
                      +{predictions[index].bonus_points} bonus poin
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center mt-4">{error}</p>
      )}

      <div className="flex justify-center mt-6 gap-4">
        {loading ? (
          <button
            className="px-6 py-2 bg-[#A2A2A2] text-white rounded-lg opacity-50 cursor-not-allowed"
            disabled
          >
            Memindai...
          </button>
        ) : (
          <>
            {/* Only show buttons if there are no predictions yet */}
            {!predictions.length && (
              <>
                {images.length < 3 && (
                  <button
                    onClick={() => handleTriggerUpload("uploadInput")}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                  >
                    + Tambah Gambar
                  </button>
                )}

                {images.length > 0 && (
                  <button
                    onClick={handlePrediction}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                  >
                    Pindai Semua
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {images.length === 0 ? (
          <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl space-y-10 md:space-y-0 md:space-x-10">
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

            <div className="hidden md:flex flex-col items-center justify-center w-full md:w-1/2 space-y-6">
              <label className="w-full max-w-lg h-56 bg-white flex flex-col items-center justify-center border-1 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-500">
                <img src={UploadIcon} alt="Upload" />
                <p className="text-gray-500">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  PNG, JPEG, or JPG (max . 3 files, total max: 20MB)
                </p>
                <input
                  id="desktopUpload"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <button className="w-full max-w-lg bg-primary hover:bg-green-700 text-white px-6 py-2 rounded-lg transition">
                Pindai
              </button>
            </div>

            <div className="flex md:hidden flex-col items-center w-full space-y-4">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
                id="cameraInput"
              />
              <input
                id="uploadInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {use === "camera" && (
                <button
                  onClick={() => handleTriggerUpload("cameraInput")}
                  className="w-full max-w-xs bg-primary text-white px-6 py-3 rounded-lg"
                >
                  Ambil Photo
                </button>
              )}

              {use === "upload" && (
                <>
                  <label className="w-full max-w-sm h-56 flex flex-col items-center justify-center bg-white border-1 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-500">
                    <p className="text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      PNG, JPEG, or JPG (max . 3 files, total max: 20MB)
                    </p>
                    <input
                      id="desktopUpload"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={() => handleTriggerUpload("uploadInput")}
                    className="w-full max-w-xs bg-primary text-white px-6 py-3 rounded-lg"
                  >
                    Unggah Photo
                  </button>
                </>
              )}

              {!use && (
                <>
                  <button
                    onClick={() => handleTriggerUpload("cameraInput")}
                    className="w-full max-w-xs bg-primary text-white px-6 py-3 rounded-lg"
                  >
                    Ambil Photo
                  </button>
                  <p className="text-sm text-gray-500">atau</p>
                  <button
                    onClick={() => handleTriggerUpload("uploadInput")}
                    className="w-full max-w-xs bg-primary text-white px-6 py-3 rounded-xl flex items-center justify-center space-x-2"
                  >
                    <span>Unggah Photo</span>
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          renderPreview()
        )}
      </div>
    </MainLayout>
  );
};

export default ScanPage;