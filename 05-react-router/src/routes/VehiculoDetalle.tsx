import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Vehiculo } from "../types/vehiculo.interface";

function formatearFecha(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "2-digit" });
  } catch {
    return iso;
  }
}

export default function VehiculoDetalle() {
  const { matricula } = useParams<{ matricula: string }>();
  const navigate = useNavigate();

  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/vehiculos.json")
      .then((res) => res.json())
      .then((data: Vehiculo[]) => setVehiculos(data))
      .catch(() => setError("No se pudo cargar el detalle"))
      .finally(() => setCargando(false));
  }, []);

  const v = useMemo(
    () => vehiculos.find(x => x.matricula === matricula),
    [vehiculos, matricula]
  );

  if (cargando) return <p>Cargando detalle…</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!v) return <h2>404 – Vehículo no encontrado</h2>;

  return (
    <section>
      <button onClick={() => navigate(-1)}>⬅️ Volver</button>
      <h2>Detalle: {v.marca} {v.modelo}</h2>

      <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16, marginTop: 8 }}>
        <p><strong>Matrícula:</strong> <code>{v.matricula}</code></p>
        <p><strong>Marca/Modelo:</strong> {v.marca} {v.modelo}</p>
        <p><strong>Color:</strong> {v.color}</p>
        <p>
          <strong>Seguro:</strong>{" "}
          {v.seguroEnVigor ? "En vigor ✅" : "Caducado ❌"}
        </p>
        <p><strong>Última ITV:</strong> {formatearFecha(v.fechaUltimaITV)}</p>
      </div>

      {!v.seguroEnVigor && (
        <div style={{ marginTop: 12, background: "#fff7ed", border: "1px solid #fed7aa", padding: 12, borderRadius: 8 }}>
          ⚠️ Atención: El seguro no está en vigor.
        </div>
      )}
    </section>
  );
}
