import { useAppDispatch, useAppSelector } from "../store/hooks";
import { activar, desactivar, toggle } from "../features/alerta/alertaSlice";

export default function BotonAlertaRedux() {
  const dispatch = useAppDispatch();
  const activas = useAppSelector(s => s.alerta.activas);

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button onClick={() => dispatch(toggle())}>Alternar</button>
      <button onClick={() => dispatch(activar())} disabled={activas}>Activar</button>
      <button onClick={() => dispatch(desactivar())} disabled={!activas}>Desactivar</button>
    </div>
  );
}
