import { useAlerta } from "../context/AlertaContext";

export default function BotonAlerta() {
  const { toggle, activar, desactivar, estado } = useAlerta();
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button onClick={toggle}>Alternar</button>
      <button onClick={activar} disabled={estado.activas}>Activar</button>
      <button onClick={desactivar} disabled={!estado.activas}>Desactivar</button>
    </div>
  );
}
