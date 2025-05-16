import { Navigate } from "react-router-dom";
import { useAuth } from "../firebase/auth-context";

const ProtectedRoute = ({ children, requiredRole = ["admin", "staff"] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // If no role is required or user has the required role
  if (requiredRole.length === 0 || (user.role && requiredRole.includes(user.role))) {
    return <>{children}</>;
  }

  return <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
