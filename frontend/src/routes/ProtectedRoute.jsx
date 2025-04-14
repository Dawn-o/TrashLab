import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // Redirect to login with return URL
    const returnPath = window.location.pathname;
    return <Navigate to={`/login?redirect=${returnPath}`} replace />;
  }

  return children;
};

export default ProtectedRoute;