import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate(); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white space-y-4">
      <h1 className="text-2xl font-bold">Welcome to Home</h1>
      <button
        onClick={() => navigate("/camera")}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Open Camera
      </button>
      <button
        onClick={() => navigate("/upload")}
        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Upload File
      </button>
    </div>
  );
}
