import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { fetchVehiculos, deleteVehiculo } from "./vehiculosSlice";

export default function VehiculosList() {
  const dispatch = useDispatch<AppDispatch>();
  const { lista, loading } = useSelector((state: RootState) => state.vehiculos);

  useEffect(() => {
    dispatch(fetchVehiculos());
  }, [dispatch]);

  if (loading) return <p>Cargando vehículos...</p>;

  return (
    <div className="vehiculos-list">
      <h2>🚘 Lista de vehículos</h2>
      {lista.map((v) => (
        <div key={v.id} className="vehiculo-card">
          <strong>{v.matricula}</strong> — {v.marca} {v.modelo} ({v.anioMatriculacion})
          <p>
            ⛽ {v.combustible} | ITV: {v.itvVigente ? "✅" : "❌"} | Seguro:{" "}
            {v.seguroVigente ? "✅" : "❌"}
          </p>
          <button onClick={() => dispatch(deleteVehiculo(v.id!))}>🗑️ Eliminar</button>
        </div>
      ))}
    </div>
  );
}
