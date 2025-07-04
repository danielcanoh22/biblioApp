import { Navigate, Outlet } from "react-router";
import { useAuth } from "~/context/AuthContext";

export default function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/libros" replace />;
  }

  return <Outlet />;
}
