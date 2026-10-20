import { useAppSelector } from "../store/hooks";

export default function IndicadorAlertaRedux() {
  const { activas } = useAppSelector(s => s.alerta);
  return (
    <p>
      {activas ? "🟢 Alertas activas" : "⚪ Alertas desactivadas"}
    </p>
  );
}
