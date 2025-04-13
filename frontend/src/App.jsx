import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProtectedRoute from "./routes/ProtectedRoutes.jsx";
import ExchangePage from "./pages/ExchangePage.jsx";
import ScanPage from "./pages/ScanPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import OrganikPage from "./pages/OrganikPage.jsx";

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/organic" element={<OrganikPage />} />
        <Route path="/home" 
        element={
            <HomePage />
        } />
        <Route path="/exchange" 
        element={
          <ProtectedRoute>
            <ExchangePage />
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
