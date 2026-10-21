import { Link } from "react-router";

export default function NoAcceso() {
  return (
    <main style={{ padding: 16, textAlign: "center" }}>
      <h1 style={{ color: "crimson" }}>🚫 No tienes acceso</h1>
      <p>Esta sección es solo para administradores.</p>
      <Link to="/">Volver a la página principal</Link>
    </main>
  );
}
