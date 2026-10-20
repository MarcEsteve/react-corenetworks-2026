import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <main style={{ padding: 16 }}>
      <h1>📊 Dashboard</h1>
      <p>Bienvenido, <strong>{user?.name}</strong></p>
      <button onClick={logout}>Cerrar sesión</button>
    </main>
  );
}
