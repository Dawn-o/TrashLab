import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export const Camera = forwardRef(
  (
    {
      facingMode = "environment",
      numberOfCamerasCallback,
      videoSourceDeviceId,
      errorMessages,
      videoReadyCallback,
    },
    ref
  ) => {
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const cameraStarted = useRef(false); // ✅ Gunakan useRef untuk tracking status kamera
    const [torchSupported, setTorchSupported] = useState(false);
    const [currentFacingMode, setCurrentFacingMode] = useState(facingMode);

    useEffect(() => {
      startCamera();
    }, [videoSourceDeviceId, currentFacingMode]); // ✅ Tambahkan currentFacingMode agar berubah saat switchCamera

    const startCamera = async (retry = 1) => {
      if (cameraStarted.current) return;
      cameraStarted.current = true;

      try {
        const constraints = {
          video: {
            facingMode: currentFacingMode,
            deviceId: videoSourceDeviceId
              ? { exact: videoSourceDeviceId }
              : undefined,
          },
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((d) => d.kind === "videoinput");
        numberOfCamerasCallback(videoDevices.length);

        const track = stream.getVideoTracks()[0];
        setTorchSupported(track?.getCapabilities().torch || false);

        if (videoReadyCallback) {
          videoReadyCallback();
        }
      } catch (error) {
        console.error(error);

        // 🚀 Jika gagal, coba lagi satu kali setelah 1 detik
        if (retry === 1) {
          setTimeout(() => startCamera(2), 1000);
        } else {
          alert(
            errorMessages?.noCameraAccessible ||
              "No camera accessible. Please check your device."
          );
        }
      }
    };
    // Fungsi untuk mengambil gambar dari video
    const takePhoto = () => {
      if (!videoRef.current || videoRef.current.readyState !== 4) {
        console.error("Camera is not ready yet.");
        return null;
      }

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Pastikan video memiliki ukuran yang valid
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;

      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      return canvas.toDataURL("image/png"); // Output dalam bentuk base64
    };

    // Fungsi untuk mengganti kamera (jika ada lebih dari satu)
    const switchCamera = () => {
      setCurrentFacingMode((prevMode) =>
        prevMode === "user" ? "environment" : "user"
      );
      cameraStarted.current = false; // ✅ Reset agar kamera bisa restart dengan mode baru
    };

    // Fungsi untuk menyalakan/mematikan flash/torch
    const toggleTorch = () => {
      if (!streamRef.current) return false;

      const track = streamRef.current.getVideoTracks()[0];
      const torchState = !track.getSettings().torch;

      track.applyConstraints({ advanced: [{ torch: torchState }] });

      return torchState;
    };

    useImperativeHandle(ref, () => ({
      takePhoto,
      switchCamera,
      toggleTorch,
      torchSupported,
    }));

    return (
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  }
);
