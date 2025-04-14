import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  
  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;