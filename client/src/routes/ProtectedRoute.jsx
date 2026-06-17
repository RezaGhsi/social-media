import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth";
import { FaSpinner } from "react-icons/fa";

const ProtectedRoute = () => {
  const { isAuthenticated, isInitializing, loading } = useAuth();
  const location = useLocation();

  if (isInitializing || loading) {
    return (
      <div>
        <span>Loading ...</span>
        <FaSpinner />
      </div>
    );
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default ProtectedRoute;
