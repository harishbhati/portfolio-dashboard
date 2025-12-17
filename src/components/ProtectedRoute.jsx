import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useSelector(state => state.user);

  // While checking auth, don't render anything
  if (loading) {
    return <div>Loading...</div>;
  }

  // Not authenticated → login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated → render route
  return <Outlet />;
};

export default ProtectedRoute;
