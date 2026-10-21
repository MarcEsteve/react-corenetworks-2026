import { type SubmitEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || "/panel";

  async function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    setError(null);
    const ok = await login(username, password);
    if (ok) navigate(from, { replace: true });
    else setError("Credenciales inválidas");
  }

  return (
    <main style={{ padding: 16 }}>
      <h1>🔐 Login</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, maxWidth: 320 }}>
        <input
          placeholder="usuario (admin/marta/leo/marc)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="contraseña (admin123/marta2025/leo2025/12345)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Entrar</button>
        {error && <small style={{ color: "crimson" }}>{error}</small>}
      </form>
    </main>
  );
}
