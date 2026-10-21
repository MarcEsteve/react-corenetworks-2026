import { Link } from "react-router";
export default function Home() {
  return (
    <main style={{ padding: 16 }}>
      <h1>🏠 Inicio</h1>
      <p>Demo de rutas protegidas con contexto de autenticación.</p>
      <p>
        <Link to="/panel">Ir al Panel (protegido)</Link> |{" "}
        <Link to="/login">Login</Link>
      </p>
    </main>
  );
}
