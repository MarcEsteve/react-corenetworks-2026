import { useState } from "react";
import { auth } from "../firebaseConfig";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function AuthDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<null | string>(null);
  const [error, setError] = useState("");

  // Registro
  const handleRegister = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      setUser(res.user.email ?? null);
      setError("");
    } catch (err: unknown) {
      setError("❌ Error al registrar usuario: " + (err instanceof Error ? err.message : "Error desconocido"));
    }
  };

  // Login
  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user.email ?? null);
      setError("");
    } catch {
      setError("⚠️ Usuario o contraseña incorrectos");
    }
  };

  return (
    <div style={{ maxWidth: 300, margin: "0 auto" }}>
      <h2>Firebase Auth Demo</h2>
      {user ? (
        <p>✅ Bienvenido, {user}</p>
      ) : (
        <>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button onClick={handleRegister}>Registrar</button>
            <button onClick={handleLogin}>Iniciar sesión</button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </div>
  );
}
