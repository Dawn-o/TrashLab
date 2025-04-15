import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GuestIcon from "../assets/svg/GuestIcon.svg";
import MainLayout from "../layouts/MainLayout.jsx";

const ScanPage = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [use, setUse] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const useParam = params.get("use");
        const triggerUpload = (id) => {
            document.getElementById(id).click();
        };

        if (useParam) {
            setUse(useParam);

            // Trigger fungsi sesuai value dari query
            if (useParam === "camera") {
                const triggerUpload = (id) => {
                    document.getElementById(id).click();
                };
                triggerUpload("cameraInput");
            } else if (useParam === "upload") {
                triggerUpload("uploadInput");
            }

            // Bersihin param dari URL
            params.delete("use");
            const newUrl = `${window.location.pathname}?${params.toString()}`;
            window.history.replaceState({}, "", newUrl);
        }
    }, []);
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
                                capture="environment" // ini penting: membuka kamera!
                                onChange={handleImageUpload}
                                className="hidden"
                                id="cameraInput"
                            />

                            <button
                                onClick={() => document.getElementById("cameraInput").click()}
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
                </div>
            </div>
        </MainLayout>
    );
}

export default ScanPage;
