import { useAlerta } from "../context/AlertaContext";

export default function IndicadorAlerta() {
  const { estado } = useAlerta();
  return (
    <p>
      {estado.activas ? "🟢 Alertas activas" : "⚪ Alertas desactivadas"}
    </p>
  );
}
