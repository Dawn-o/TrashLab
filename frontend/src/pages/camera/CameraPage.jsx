import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Camera } from "../../../src/Camera";
import { useNavigate } from "react-router-dom";

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

const ButtonBack = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.8);
  color: black;
  font-size: 16px;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  z-index: 10;
  &:hover {
    background: white;
  }
`;

export default function CameraPage() {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [activeDeviceId, setActiveDeviceId] = useState(undefined);
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showFullPreview, setShowFullPreview] = useState(false);
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
        setShowFullPreview(true);
        console.log("Photo captured:", photo);
      } else {
        console.error("Failed to capture photo.");
      }
    }
  };

  return (
    <Wrapper>
      <ButtonBack onClick={() => navigate("/")}>⬅ Back</ButtonBack>

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

      <SidePanel>
        <Button onClick={() => camera.current?.switchCamera()}>🔄</Button>
        <CaptureButton onClick={handleCapture}>📷</CaptureButton>
        {camera.current?.torchSupported && (
          <Button onClick={() => setTorchEnabled(camera.current.toggleTorch())}>
            {torchEnabled ? "💡 Off" : "💡 On"}
          </Button>
        )}
        <Select
          onChange={(event) => setActiveDeviceId(event.target.value)}
          value={activeDeviceId}
        >
          <option value="">Select Camera</option>
          {devices.map((d, index) => (
            <option key={d.deviceId} value={d.deviceId}>
              {d.label || `Camera ${index + 1}`}
            </option>
          ))}
        </Select>

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
            onClick={() => setShowFullPreview(true)}
          />
        )}
      </SidePanel>
    </Wrapper>
  );
}
