import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./routes/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" 
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
