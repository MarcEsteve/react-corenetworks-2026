import { NavLink, Outlet } from "react-router";
import { useAuth } from "../../auth/AuthContext";

const link = ({ isActive }: { isActive: boolean }) => ({
  textDecoration: isActive ? "underline" : "none",
  marginRight: 12,
});

export default function PanelLayout() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 16 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
          backgroundColor: "#f5f5f5",
          padding: "8px 16px",
          borderRadius: 8,
        }}
      >
        <nav>
          <NavLink to="/panel" style={link} end>Resumen</NavLink>
          <NavLink to="/panel/vehiculos" style={link}>Vehículos</NavLink>
          <NavLink to="/panel/ajustes" style={link}>Ajustes</NavLink>
        </nav>

        <div>
          {user ? (
            <>
              <span style={{ marginRight: 8 }}>👋 Hola {user.name}</span>
              <button onClick={logout}>Salir</button>
            </>
          ) : (
            <span>Invitado</span>
          )}
        </div>
      </header>

      <Outlet />
    </div>
  );
}
