import { useState, type FormEvent } from "react";
import type { Vehiculo, VehiculoInput } from "../../types/vehiculo";

const emptyVehicle: VehiculoInput = {
  matricula: "",
  marca: "",
  modelo: "",
  anioMatriculacion: new Date().getFullYear(),
  combustible: "Gasolina",
  itvVigente: false,
  seguroVigente: false,
};

export default function VehiculoForm({
  vehicle,
  onSubmit,
  onCancel,
}: {
  vehicle?: Vehiculo;
  onSubmit: (data: VehiculoInput) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<VehiculoInput>(vehicle ? {
    matricula: vehicle.matricula,
    marca: vehicle.marca,
    modelo: vehicle.modelo,
    anioMatriculacion: vehicle.anioMatriculacion,
    combustible: vehicle.combustible,
    itvVigente: vehicle.itvVigente,
    seguroVigente: vehicle.seguroVigente,
  } : emptyVehicle);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSubmit({ ...form, matricula: form.matricula.trim().toUpperCase() });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "No se pudo guardar el vehículo.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="vehicle-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>Matrícula<input value={form.matricula} onChange={(event) => setForm({ ...form, matricula: event.target.value })} placeholder="1234 ABC" required maxLength={12} /></label>
        <label>Marca<input value={form.marca} onChange={(event) => setForm({ ...form, marca: event.target.value })} placeholder="Ej. SEAT" required /></label>
        <label>Modelo<input value={form.modelo} onChange={(event) => setForm({ ...form, modelo: event.target.value })} placeholder="Ej. León" required /></label>
        <label>Año de matriculación<input type="number" value={form.anioMatriculacion} onChange={(event) => setForm({ ...form, anioMatriculacion: Number(event.target.value) })} min={1900} max={new Date().getFullYear()} required /></label>
        <label>Combustible<select value={form.combustible} onChange={(event) => setForm({ ...form, combustible: event.target.value as VehiculoInput["combustible"] })}>
          <option>Gasolina</option><option>Diésel</option><option>Eléctrico</option><option>Híbrido</option><option>GLP</option>
        </select></label>
      </div>
      <div className="check-row">
        <label className="check-label"><input type="checkbox" checked={form.itvVigente} onChange={(event) => setForm({ ...form, itvVigente: event.target.checked })} /><span>ITV vigente</span></label>
        <label className="check-label"><input type="checkbox" checked={form.seguroVigente} onChange={(event) => setForm({ ...form, seguroVigente: event.target.checked })} /><span>Seguro vigente</span></label>
      </div>
      {error && <div className="form-alert" role="alert">{error}</div>}
      <div className="form-actions">
        <button className="button button--outline" type="button" onClick={onCancel} disabled={saving}>Cancelar</button>
        <button className="button button--accent" type="submit" disabled={saving}>{saving ? "Guardando..." : vehicle ? "Guardar cambios" : "Añadir vehículo"}</button>
      </div>
    </form>
  );
}
