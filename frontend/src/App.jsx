import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Camera } from "./Camera";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  background: black;
`;

const CameraContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const SidePanel = styled.div`
  width: 20%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 20px;
  margin: 10px;
  &:focus {
    outline: none;
  }
`;

const CaptureButton = styled(Button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: white;
  color: black;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Select = styled.select`
  background: white;
  border: none;
  padding: 5px;
  margin-top: auto;
  font-size: 14px;
  color: black;
`;

const FullPreviewOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  color: black;
  font-size: 18px;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
`;

const App = () => {
  const [devices, setDevices] = useState([]);
  const [activeDeviceId, setActiveDeviceId] = useState(undefined);
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showFullPreview, setShowFullPreview] = useState(false); // ✅ State untuk full preview
  const camera = useRef(null);

  useEffect(() => {
    (async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((i) => i.kind === "videoinput");
      console.log("Detected cameras:", videoDevices);
      setDevices(videoDevices);
    })();
  }, []);

  const handleCapture = () => {
    if (camera.current) {
      const photo = camera.current.takePhoto();
      if (photo) {
        setCapturedPhoto(photo);
        setShowFullPreview(true); // ✅ Tampilkan full preview setelah ambil foto
        console.log("Photo captured:", photo);
      } else {
        console.error("Failed to capture photo.");
      }
    }
  };

  return (
    <Wrapper>
      {/* Full Preview Overlay */}
      {showFullPreview && capturedPhoto && (
        <FullPreviewOverlay>
          <CloseButton onClick={() => setShowFullPreview(false)}>
            Close
          </CloseButton>
          <img
            src={capturedPhoto}
            alt="Captured"
            style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "10px" }}
          />
        </FullPreviewOverlay>
      )}

      {/* Kamera */}
      <CameraContainer>
        <Camera
          ref={camera}
          facingMode="environment"
          videoSourceDeviceId={activeDeviceId}
          errorMessages={{
            noCameraAccessible:
              "No camera accessible. Please check your device.",
            permissionDenied: "Camera permission denied. Please allow access.",
          }}
        />
      </CameraContainer>

      {/* Side Panel */}
      <SidePanel>
        <Button
          onClick={() => {
            if (camera.current) camera.current.switchCamera();
          }}
        >
          🔄
        </Button>
        <CaptureButton onClick={handleCapture}>📷</CaptureButton>
        {camera.current?.torchSupported && (
          <Button
            onClick={() => {
              if (camera.current) {
                const newTorchState = camera.current.toggleTorch();
                setTorchEnabled(newTorchState);
              }
            }}
          >
            {torchEnabled ? "💡 Off" : "💡 On"}
          </Button>
        )}
        <Select
          onChange={(event) => setActiveDeviceId(event.target.value)}
          value={activeDeviceId}
        >
          <option value="">Select Camera</option>
          {devices.map((d) => (
            <option key={d.deviceId} value={d.deviceId}>
              {d.label || `Camera ${devices.indexOf(d) + 1}`}
            </option>
          ))}
        </Select>

        {/* ✅ Thumbnail Foto (Klik untuk Full Preview) */}
        {capturedPhoto && !showFullPreview && (
          <img
            src={capturedPhoto}
            alt="Captured"
            style={{
              width: "80%",
              marginTop: "10px",
              borderRadius: "10px",
              border: "2px solid white",
              cursor: "pointer",
            }}
            onClick={() => setShowFullPreview(true)} // ✅ Klik untuk buka full preview
          />
        )}
      </SidePanel>
    </Wrapper>
  );
};

export default App;
