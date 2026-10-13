import { useState } from "react";

type EstadoRestriccion = "Permitido" | "Restricción parcial" | "Prohibido" | "No es un estado correcto";

export default function Restriccion() {
  // usamos useState para guardar el estado actual
  const [estado, setEstado] = useState<EstadoRestriccion>("Permitido");

  // función para ciclar el estado al pulsar botón
  function cambiarEstado() {
    if (estado === "Permitido") setEstado("Restricción parcial");
    else if (estado === "Restricción parcial") setEstado("Prohibido");
    else if (estado === "Prohibido") setEstado("Permitido");
    else setEstado("No es un estado correcto");
  }

  return (
    <div style={{ border: "1px solid #444", padding: "1rem", borderRadius: "8px" }}>
      <h3>Restricción de tráfico actual:</h3>
      <p><strong>{estado}</strong></p>
      <button onClick={cambiarEstado}>
        Cambiar estado
      </button>
    </div>
  );
}
