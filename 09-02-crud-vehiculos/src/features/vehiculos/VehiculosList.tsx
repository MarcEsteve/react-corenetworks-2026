import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../app/store";
import {
  fetchVehiculos,
  deleteVehiculo,
  updateVehiculo,
  type Vehiculo,
} from "./vehiculosSlice";

export default function VehiculosList() {
  const dispatch = useDispatch<AppDispatch>();
  const { lista, loading } = useSelector((state: RootState) => state.vehiculos);

  // Estado para gestionar la edición en línea de un vehículo
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formEdit, setFormEdit] = useState<Vehiculo | null>(null);

  useEffect(() => {
    dispatch(fetchVehiculos());
  }, [dispatch]);

  const handleIniciarEdicion = (v: Vehiculo) => {
    setEditandoId(v.id!);
    setFormEdit({ ...v });
  };

  const handleCancelarEdicion = () => {
    setEditandoId(null);
    setFormEdit(null);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!formEdit) return;
    const { name, value, type } = e.target;
    const val =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : type === "number"
        ? Number(value)
        : value;
    setFormEdit({ ...formEdit, [name]: val });
  };

  const handleGuardarEdicion = (e: React.FormEvent) => {
    e.preventDefault();
    if (formEdit && formEdit.id) {
      dispatch(updateVehiculo(formEdit));
      setEditandoId(null);
      setFormEdit(null);
    }
  };

  if (loading) return <p>Cargando vehículos...</p>;

  return (
    <div className="vehiculos-list">
      <h2>🚘 Lista de vehículos</h2>
      {lista.length === 0 && <p>No hay vehículos registrados.</p>}
      {lista.map((v: Vehiculo) => (
        <div key={v.id} className="vehiculo-card" style={{ border: "1px solid #444", borderRadius: "8px", padding: "12px", margin: "10px 0" }}>
          {editandoId === v.id && formEdit ? (
            <form onSubmit={handleGuardarEdicion} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <h4>✏️ Editar vehículo</h4>
              <input
                name="matricula"
                value={formEdit.matricula}
                onChange={handleEditChange}
                placeholder="Matrícula"
                required
              />
              <input
                name="marca"
                value={formEdit.marca}
                onChange={handleEditChange}
                placeholder="Marca"
                required
              />
              <input
                name="modelo"
                value={formEdit.modelo}
                onChange={handleEditChange}
                placeholder="Modelo"
                required
              />
              <input
                type="number"
                name="anioMatriculacion"
                value={formEdit.anioMatriculacion}
                onChange={handleEditChange}
                placeholder="Año"
                required
              />
              <select
                name="combustible"
                value={formEdit.combustible}
                onChange={handleEditChange}
              >
                <option>Gasolina</option>
                <option>Diésel</option>
                <option>Eléctrico</option>
                <option>Híbrido</option>
              </select>
              <label>
                ITV vigente:{" "}
                <input
                  type="checkbox"
                  name="itvVigente"
                  checked={formEdit.itvVigente}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                Seguro vigente:{" "}
                <input
                  type="checkbox"
                  name="seguroVigente"
                  checked={formEdit.seguroVigente}
                  onChange={handleEditChange}
                />
              </label>
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <button type="submit">💾 Guardar cambios</button>
                <button type="button" onClick={handleCancelarEdicion}>❌ Cancelar</button>
              </div>
            </form>
          ) : (
            <>
              <strong>{v.matricula}</strong> — {v.marca} {v.modelo} ({v.anioMatriculacion})
              <p>
                ⛽ {v.combustible} | ITV: {v.itvVigente ? "✅" : "❌"} | Seguro:{" "}
                {v.seguroVigente ? "✅" : "❌"}
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => handleIniciarEdicion(v)}>✏️ Actualizar</button>
                <button onClick={() => dispatch(deleteVehiculo(v.id!))}>🗑️ Eliminar</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

