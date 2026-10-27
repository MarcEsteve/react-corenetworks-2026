import VehiculoForm from "./features/vehiculos/VehiculoForm";
import VehiculosList from "./features/vehiculos/VehiculosList";

export default function App() {
  return (
    <main style={{ padding: "20px" }}>
      <h1>DGT — Gestión de Vehículos</h1>
      <VehiculoForm />
      <hr />
      <VehiculosList />
    </main>
  );
}
