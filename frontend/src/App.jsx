import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./routes/ProtectedRoutes";
import ExchangePage from "./pages/ExchangePage";
import ScanPage from "./pages/ScanPage";
import HistoryPage from "./pages/HistoryPage";
import OrganikPage from "./pages/OrganikPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" 
        element={
            <HomePage />
        } />
        <Route path="/exchange" 
        element={
          <ProtectedRoute>
            <OrganikPage />
          </ProtectedRoute>
        } />
        <Route path="/scan" 
        element={
          <ProtectedRoute>
            <ScanPage />
          </ProtectedRoute>
        } />
        <Route path="/history" 
        element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
