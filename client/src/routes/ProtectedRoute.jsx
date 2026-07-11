import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth";

const ProtectedRoute = () => {
  const { isAuthenticated, isInitializing, loading } = useAuth();
  const location = useLocation();

  if (isInitializing || loading) {
    return;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default ProtectedRoute;
