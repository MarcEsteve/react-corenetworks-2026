import { useState, type SubmitEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { from?: { pathname: string } } | null;
  const from = state?.from?.pathname || "/dashboard";

  async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await login(name || "Usuario");
    navigate(from, { replace: true });
  }

  return (
    <main style={{ padding: 16 }}>
      <h1>🔐 Login</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, maxWidth: 320 }}>
        <input
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>
      </form>
      {from !== "/dashboard" && (
        <small>Te redirigiremos a: <code>{from}</code></small>
      )}
    </main>
  );
}
