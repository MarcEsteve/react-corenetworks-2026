import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type { UserRole } from "../context/auth-context";

export default function RoleRoute({ allowedRoles }: { allowedRoles: UserRole[] }) {
  const { role, authError } = useAuth();
  if (authError || !role) return <Navigate to="/no-acceso" replace />;
  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/no-acceso" replace />;
}
