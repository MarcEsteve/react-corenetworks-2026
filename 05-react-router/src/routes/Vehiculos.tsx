import { Link } from "react-router-dom";

const data = ["1234ABC", "5678XYZ"];

export default function Vehiculos() {
  return (
    <>
      <h1>🚗 Vehículos</h1>
      <ul>
        {data.map(m => (
          <li key={m}><Link to={`/vehiculos/${m}`}>{m}</Link></li>
        ))}
      </ul>
    </>
  );
}
