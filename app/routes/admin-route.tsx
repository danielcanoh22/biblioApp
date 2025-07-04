import { Navigate, Outlet } from "react-router";
import { useAuth } from "~/context/AuthContext";

export default function AdminRoute() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/libros" replace />;
  }

  return <Outlet />;
}
