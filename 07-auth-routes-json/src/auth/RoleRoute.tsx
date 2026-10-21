import { Navigate } from "react-router";
import { type ReactNode } from "react";
import { useAuth } from "./AuthContext";

type RoleRouteProps = {
  allowedRole: "admin" | "user";
  children: ReactNode;
};

export default function RoleRoute({ allowedRole, children }: RoleRouteProps) {
  const { user, isAuthenticated } = useAuth();

  // Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado pero no tiene el rol requerido, lleva a la página de acceso denegado
  if (user?.role !== allowedRole) {
    return <Navigate to="/no-acceso" replace />;
  }

  // Si tiene el rol correcto, renderiza el contenido protegido
  return <>{children}</>;
}
