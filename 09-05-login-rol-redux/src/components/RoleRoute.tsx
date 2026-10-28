import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type { JSX } from "react";

export default function RoleRoute({
  allowed,
  children,
}: {
  allowed: "admin" | "user";
  children: JSX.Element;
}) {
  const { loading, user, profile } = useAuth();
  if (loading) return <p>Cargando sesión…</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (!profile || profile.role !== allowed) return <Navigate to="/no-acceso" replace />;
  return children;
}
