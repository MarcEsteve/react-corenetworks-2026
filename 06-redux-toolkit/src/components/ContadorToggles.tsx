import { useAppSelector } from "../store/hooks";

export default function ContadorToggles() {
  const { totalToggles, totalTogglesActivar, totalTogglesDesactivar } = useAppSelector(s => s.alerta);
  return (
    <p>
      Cambios: {totalToggles} (Activar: {totalTogglesActivar}, Desactivar: {totalTogglesDesactivar})

    </p>
  );
}
