import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

// Page imports
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import HomePage from "./pages/HomePage.jsx";
import ExchangePage from "./pages/ExchangePage.jsx";
import ScanPage from "./pages/ScanPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import OrganikPage from "./pages/OrganikPage.jsx";
import AnorganikPage from "./pages/AnorganikPage.jsx";
import GuestPage from "./pages/GuestPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PanduanPage from "./pages/PanduanPage.jsx";

function App() {
  return (
    <Router basename="/">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/pindai" element={<GuestPage />} />
        <Route path="/panduan" element={<PanduanPage />} />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/panduan/sampah_organik"
          element={
            <ProtectedRoute>
              <OrganikPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/panduan/sampah_anorganik"
          element={
            <ProtectedRoute>
              <AnorganikPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exchange"
          element={
            <ProtectedRoute>
              <ExchangePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/scan"
          element={
            <ProtectedRoute>
              <ScanPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
