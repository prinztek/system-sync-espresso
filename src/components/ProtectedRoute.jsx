import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth";

const ProtectedRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
