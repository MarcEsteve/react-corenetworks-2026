import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useAppDispatch } from "../app/hooks";
import { showNotice } from "../features/ui/uiSlice";
import Notice from "./Notice";

export default function Layout() {
  const { user, role, authError, signOutUser } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/");
    } catch (error) {
      dispatch(showNotice({
        kind: "error",
        message: error instanceof Error ? error.message : "No se pudo cerrar sesión.",
      }));
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/" aria-label="DGT, inicio">
          <span className="brand-mark">DGT</span>
          <span className="brand-name">Gestión de vehículos<small>Dirección General de Tráfico</small></span>
        </NavLink>
        <nav className="main-nav" aria-label="Navegación principal">
          <NavLink to="/" end>Inicio</NavLink>
          {user && <NavLink to="/vehiculos">Vehículos</NavLink>}
          {role === "admin" && <NavLink to="/usuarios">Usuarios</NavLink>}
          {role === "admin" && <NavLink to="/ajustes">Ajustes</NavLink>}
        </nav>
        <div className="account-area">
          {user ? (
            <>
              <span className="account-name">{user.displayName || user.email}</span>
              <span className="role-pill">{role === "admin" ? "Administrador" : "Operador"}</span>
              <button className="button button--quiet button--small" type="button" onClick={handleSignOut}>
                Salir
              </button>
            </>
          ) : (
            <NavLink className="button button--dark button--small" to="/login">Acceder</NavLink>
          )}
        </div>
      </header>
      <Notice />
      {authError && user && <div className="auth-profile-error" role="alert">No se pudo cargar tu perfil: {authError}</div>}
      <main className="main-content"><Outlet /></main>
      <footer className="site-footer">
        <span>Portal de gestión de vehículos · Entorno demostrativo</span>
        <span>Datos gestionados con Firebase</span>
      </footer>
    </div>
  );
}
