import { useLoaderData, useNavigate } from "react-router-dom";
import type { Vehiculo } from "../types/vehiculo";

type LoaderData = { vehiculo: Vehiculo };

function formatearFecha(iso: string) {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso :
    d.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "2-digit" });
}

export default function VehiculoDetalle() {
  const { vehiculo: v } = useLoaderData() as LoaderData;
  const navigate = useNavigate();

  return (
    <section>
      <button onClick={() => navigate(-1)}>⬅️ Volver</button>
      <h2>Detalle: {v.marca} {v.modelo}</h2>

      <div className="dgt-tarjeta" style={{ marginTop: 12 }}>
        <p><strong>Matrícula:</strong> <code>{v.matricula}</code></p>
        <p><strong>Color:</strong> {v.color}</p>
        <p><strong>Seguro:</strong> {v.seguroEnVigor ? "En vigor ✅" : "Caducado ❌"}</p>
        <p><strong>Última ITV:</strong> {formatearFecha(v.fechaUltimaITV)}</p>
      </div>
    </section>
  );
}
