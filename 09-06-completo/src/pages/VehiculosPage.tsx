import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createVehiculo, deleteVehiculo, fetchVehiculos, updateVehiculo } from "../features/vehiculos/vehiculosSlice";
import VehiculoForm from "../features/vehiculos/VehiculoForm";
import { showNotice } from "../features/ui/uiSlice";
import type { Vehiculo, VehiculoInput } from "../types/vehiculo";

export default function VehiculosPage() {
  const dispatch = useAppDispatch();
  const { lista, loading, error } = useAppSelector((state) => state.vehiculos);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Vehiculo | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    dispatch(fetchVehiculos());
  }, [dispatch]);

  const filteredVehicles = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("es");
    if (!normalizedQuery) return lista;
    return lista.filter((vehicle) =>
      [vehicle.matricula, vehicle.marca, vehicle.modelo, vehicle.combustible]
        .some((value) => value.toLocaleLowerCase("es").includes(normalizedQuery)),
    );
  }, [lista, query]);

  const submitVehicle = async (data: VehiculoInput) => {
    try {
      if (editing) await dispatch(updateVehiculo({ ...data, id: editing.id })).unwrap();
      else await dispatch(createVehiculo(data)).unwrap();
      setEditing(null);
      setAdding(false);
      dispatch(showNotice({ kind: "success", message: editing ? "Vehículo actualizado." : "Vehículo añadido." }));
    } catch (submitError) {
      throw new Error(typeof submitError === "string" ? submitError : "No se pudo guardar el vehículo.");
    }
  };

  const removeVehicle = async (vehicle: Vehiculo) => {
    if (!window.confirm(`¿Eliminar el vehículo ${vehicle.matricula}? Esta acción no se puede deshacer.`)) return;
    try {
      await dispatch(deleteVehiculo(vehicle.id)).unwrap();
      dispatch(showNotice({ kind: "success", message: "Vehículo eliminado." }));
    } catch (deleteError) {
      dispatch(showNotice({
        kind: "error",
        message: typeof deleteError === "string" ? deleteError : "No se pudo eliminar el vehículo.",
      }));
    }
  };

  return (
    <section className="workspace">
      <div className="page-heading">
        <div><span className="eyebrow">REGISTRO CENTRALIZADO</span><h1>Vehículos</h1><p>Consulta y actualiza la información de la flota.</p></div>
        <button className="button button--accent" type="button" onClick={() => { setEditing(null); setAdding(true); }}>＋ Añadir vehículo</button>
      </div>
      <div className="summary-row">
        <div className="summary-card"><span className="summary-icon">▤</span><div><small>VEHÍCULOS REGISTRADOS</small><strong>{lista.length}</strong></div></div>
        <div className="summary-card"><span className="summary-icon summary-icon--green">✓</span><div><small>ITV VIGENTE</small><strong>{lista.filter((vehicle) => vehicle.itvVigente).length}</strong></div></div>
        <div className="summary-card"><span className="summary-icon summary-icon--blue">◈</span><div><small>SEGURO VIGENTE</small><strong>{lista.filter((vehicle) => vehicle.seguroVigente).length}</strong></div></div>
      </div>
      <div className="table-panel">
        <div className="panel-heading">
          <div><h2>Listado de vehículos</h2><p>{filteredVehicles.length} {filteredVehicles.length === 1 ? "resultado" : "resultados"}</p></div>
          <label className="search-field"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar matrícula, marca..." aria-label="Buscar vehículos" /></label>
        </div>
        {loading ? <div className="empty-state">Cargando vehículos...</div> : error ? (
          <div className="empty-state empty-state--error"><strong>No se ha podido cargar el registro</strong><span>{error}</span><button className="button button--outline" onClick={() => dispatch(fetchVehiculos())}>Reintentar</button></div>
        ) : filteredVehicles.length === 0 ? (
          <div className="empty-state"><span className="empty-icon">▤</span><strong>{lista.length ? "No hay coincidencias" : "Aún no hay vehículos registrados"}</strong><span>{lista.length ? "Prueba con otra búsqueda." : "Añade el primer vehículo para empezar."}</span></div>
        ) : (
          <div className="table-scroll"><table className="vehicle-table">
            <thead><tr><th>MATRÍCULA</th><th>VEHÍCULO</th><th>AÑO</th><th>COMBUSTIBLE</th><th>ITV</th><th>SEGURO</th><th><span className="sr-only">Acciones</span></th></tr></thead>
            <tbody>{filteredVehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td><span className="table-plate">{vehicle.matricula}</span></td>
                <td><strong>{vehicle.marca} {vehicle.modelo}</strong><small className="table-subtext">Vehículo registrado</small></td>
                <td>{vehicle.anioMatriculacion}</td>
                <td>{vehicle.combustible}</td>
                <td><span className={`status-badge ${vehicle.itvVigente ? "status-badge--ok" : "status-badge--warning"}`}><i />{vehicle.itvVigente ? "Vigente" : "Pendiente"}</span></td>
                <td><span className={`status-badge ${vehicle.seguroVigente ? "status-badge--ok" : "status-badge--warning"}`}><i />{vehicle.seguroVigente ? "Vigente" : "Pendiente"}</span></td>
                <td><div className="row-actions"><button className="icon-button" aria-label={`Editar ${vehicle.matricula}`} onClick={() => { setAdding(false); setEditing(vehicle); }}>✎</button><button className="icon-button icon-button--delete" aria-label={`Eliminar ${vehicle.matricula}`} onClick={() => void removeVehicle(vehicle)}>⌫</button></div></td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </div>
      {(adding || editing) && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) { setAdding(false); setEditing(null); } }}>
          <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="vehicle-form-title">
            <div className="modal-heading"><div><span className="eyebrow">{editing ? "ACTUALIZACIÓN DEL REGISTRO" : "NUEVO REGISTRO"}</span><h2 id="vehicle-form-title">{editing ? "Editar vehículo" : "Añadir vehículo"}</h2></div><button className="icon-button" aria-label="Cerrar" onClick={() => { setAdding(false); setEditing(null); }}>×</button></div>
            <VehiculoForm key={editing?.id ?? "new"} vehicle={editing ?? undefined} onSubmit={submitVehicle} onCancel={() => { setAdding(false); setEditing(null); }} />
          </section>
        </div>
      )}
    </section>
  );
}
