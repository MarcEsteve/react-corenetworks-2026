import AlertasDGT from "./components/Alertas/AlertasDGT";
import Restriccion from "./components/Restriccion";

export default function App() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Simulación de restricción DGT</h1>
      <Restriccion />
      <h2>🚦 Portal DGT - Ejemplo de CSS Condicional</h2>
      <p>Activa o desactiva las alertas de tráfico con el botón:</p>

      <AlertasDGT />
    </main>
  );
}
