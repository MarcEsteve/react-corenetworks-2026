import AlertasDGT from "./components/Alertas/AlertasDGT";
import BotonDGT from "./components/Boton/BotonDGT";
import InfoConductor from "./components/InfoContductor";
import PanelDGT from "./components/PanelDGT";
import Restriccion from "./components/Restriccion";
import VehiculoCard from "./components/VehiculoCard";

export default function App() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Simulación de restricción DGT</h1>
      <Restriccion />
      <h2>🚦 Portal DGT - Ejemplo de CSS Condicional</h2>
      <p>Activa o desactiva las alertas de tráfico con el botón:</p>

      <AlertasDGT />
      <h2 id="ejemplo-css-modules">🚦 Ejemplo con CSS Modules</h2>
      <p>El botón cambia de color según el estado del tráfico:</p>

      <BotonDGT />

      <h2>🚗 Información del conductor (useState)</h2>
      <InfoConductor />

      <PanelDGT titulo="Zona restringida por contaminación">
        <VehiculoCard
          matricula="5678-XYZ"
          modelo="Renault Clio"
          color="Rojo"
          itv={true}
        />
        <p>🚫 Este vehículo no puede circular hoy por el centro urbano.</p>
      </PanelDGT>
    </main>
  );
}
