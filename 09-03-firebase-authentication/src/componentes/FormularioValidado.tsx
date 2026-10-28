import { useState } from "react";

export default function FormularioValidado() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica con regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^.{8,}$/; // mínimo 8 caracteres

    if (!emailRegex.test(email)) {
      setError("❌ El formato del email no es válido");
      return;
    }

    if (!passRegex.test(password)) {
      setError("⚠️ La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setError("");
    console.log("✅ Datos enviados correctamente:", { email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Validación básica</h2>

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@ejemplo.com"
        />
      </label>

      <label>
        Contraseña:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="mínimo 8 caracteres"
        />
      </label>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Enviar</button>
    </form>
  );
}
