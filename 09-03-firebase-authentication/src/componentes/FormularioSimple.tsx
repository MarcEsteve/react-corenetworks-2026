import { useState } from "react";

export default function FormularioSimple() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", { nombre, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Formulario controlado "simple"</h2>

      <label>
        Nombre:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Introduce tu nombre"
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Introduce tu email"
        />
      </label>

      <button type="submit">Enviar</button>
    </form>
  );
}
