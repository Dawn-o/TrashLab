import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GuestIcon from "../assets/svg/GuestIcon.svg";
import UploadIcon from "../assets/svg/upload-icon.svg";
import MainLayout from "../layouts/MainLayout.jsx";
import { predictTrash } from "../services/predictService.jsx";
import { getUserProfile } from "../services/apiServices.jsx";

const ScanPage = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [use, setUse] = useState(null);
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
        const userData = getUserProfile();

        const triggerUpload = (id) => {
            const inputElement = document.getElementById(id);
            if (inputElement) {
                inputElement.click();
            }
        };

        if (useParam) {
            setUse(useParam);

            // Trigger fungsi sesuai value dari query
            if (useParam === "camera") {
                triggerUpload("cameraInput");
            } else if (useParam === "upload") {
                triggerUpload("uploadInput");
            }

            // Bersihkan param dari URL
            params.delete("use");
            const newUrl = `${window.location.pathname}?${params.toString()}`;
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
                  ${selectedFile && !loading
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
        <MainLayout >
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl space-y-10 md:space-y-0 md:space-x-10">
                    {!imagePreview && (
                        <div className="flex flex-col items-center space-y-4 w-full md:w-1/2 text-center">
                            <img
                                src={GuestIcon}
                                alt="Guest Icon"
                                className="w-48 sm:w-64 mx-auto"
                            />
                            <p className="text-gray-700 text-base sm:text-lg leading-tight px-4">
                                Kenali jenis sampahmu dengan cepat, pindai lewat kamera atau
                                unggah dari galeri untuk proses klasifikasi.
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
                            <input
                                id="uploadInput"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />

                            {use === "camera" && (

                                <button
                                    onClick={() => triggerUpload("cameraInput")}
                                    className="w-full max-w-xs bg-primary text-white px-6 py-3 rounded-lg"
                                >
                                    Ambil Photo
                                </button>
                            )}

                            {use === "upload" && (
                                <>
                                    <label className="w-full max-w-sm h-56 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-500">
                                        <p className="text-gray-500">Click to upload Image</p>
                                        <p className="text-sm text-gray-400 mt-2">
                                            PNG, JPG, JPEG (max: 1 file)
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
                                </>
                            )}

                            {!use && (
                                <>
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
                                </>
                            )}
                        </div>
                    )}

                    {/* DESKTOP VIEW */}
                    <div className="hidden md:flex flex-col items-center justify-center w-full md:w-1/2 space-y-6">
                        {!imagePreview && (
                            <>
                                <label className="w-full max-w-sm h-56 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-green-500">
                                    <p className="text-gray-500">Click to upload Image</p>
                                    <p className="text-sm text-gray-400 mt-2">
                                        PNG, JPG, JPEG (max: 1 file)
                                    </p>
                                    <input
                                        id="desktopUpload"
                                        type="file"
                                        accept=".png, .jpg, .jpeg"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>

                                <button className="w-full max-w-sm bg-primary hover:bg-green-700 text-white px-6 py-2 rounded-lg transition">
                                    Pindai
                                </button>
                            </>
                        )}
                    </div>

                    {/* PREVIEW */}
                    {imagePreview && (
                        <div className="flex flex-col items-center space-y-4 px-4">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-[250px] sm:w-[300px] h-auto rounded-xl shadow-md"
                            />
                            <span className="bg-yellow-400 text-white px-4 py-1 rounded-full text-sm font-medium">
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
                    )}
                    {renderDesktopView()}
                    {renderPreview()}
                </div>
            </div>
        </MainLayout>
    );
}

export default ScanPage;
