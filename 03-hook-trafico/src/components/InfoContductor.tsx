import { useState } from "react";

export default function InfoConductor() {
  const [nombre] = useState("Gabriel");
  const [puntos, setPuntos] = useState(15);
  const [vehiculo, setVehiculo] = useState("Seat León");
  const [velocidad, setVelocidad] = useState(90);

  function multar() {
    setPuntos(puntos - 3);
    setVelocidad(130);
  }

  function acelerar() {
    setVelocidad(velocidad + 10);
  }

  function cambiarVehiculo(nuevoVehiculo: string) {
    setVehiculo(nuevoVehiculo);
  }

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>📋 Información del conductor</h2>
      <p>👤 Nombre: <strong>{nombre}</strong></p>
      <p>🚗 Vehículo: <strong>{vehiculo}</strong></p>
      <p>💨 Velocidad actual: <strong>{velocidad} km/h</strong></p>
      <p>🏅 Puntos del carnet: <strong>{puntos}</strong></p>

      <button onClick={multar}>
        Simular multa (-3 puntos)
      </button>
      <button onClick={acelerar} style={{ marginLeft: "1rem" }}>
        Acelerar (+10 km/h)
      </button>
      <button onClick={() => cambiarVehiculo("Tesla Model 3")} style={{ marginLeft: "1rem" }}>
        Cambiar vehículo a Tesla Model 3
      </button>
    </div>
  );
}
