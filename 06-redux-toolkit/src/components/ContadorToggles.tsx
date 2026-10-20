import { useAppSelector } from "../store/hooks";

export default function ContadorToggles() {
  const { totalToggles } = useAppSelector(s => s.alerta);
  return (
    <p>
      Cambios: {totalToggles}
    </p>
  );
}
