import { useState, type FormEvent } from 'react'
import type { Vehiculo, VehiculoInput } from '../types/vehiculo'

export default function VehiculoForm({ vehicle, onSubmit, onCancel }: {
  vehicle?: Vehiculo
  onSubmit: (data: VehiculoInput) => Promise<void>
  onCancel: () => void
}) {
  const [form, setForm] = useState<VehiculoInput>({
    matricula: vehicle?.matricula ?? '', marca: vehicle?.marca ?? '',
    modelo: vehicle?.modelo ?? '', color: vehicle?.color ?? '',
    seguroEnVigor: vehicle?.seguroEnVigor ?? false,
    fechaUltimaITV: vehicle?.fechaUltimaITV?.slice(0, 10) ?? '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (saving) return
    setSaving(true)
    setError('')
    try {
      await onSubmit({ ...form, matricula: form.matricula.trim().toUpperCase() })
    } catch (error) {
      setError(error instanceof Error ? error.message : 'No se pudo guardar el vehículo.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="vehicle-form-title">
      <div className="modal-heading"><h2 id="vehicle-form-title">{vehicle ? 'Editar vehículo' : 'Añadir vehículo'}</h2></div>
      <form className="vehicle-form" onSubmit={submit}>
        <fieldset disabled={saving} style={{ border: 0, padding: 0, margin: 0 }}>
          <div className="form-grid">
            <label>Matrícula<input autoFocus required maxLength={100} value={form.matricula} onChange={e => setForm({ ...form, matricula: e.target.value })} placeholder="1234ABC" /></label>
            <label>Marca<input required maxLength={100} value={form.marca} onChange={e => setForm({ ...form, marca: e.target.value })} /></label>
            <label>Modelo<input required maxLength={100} value={form.modelo} onChange={e => setForm({ ...form, modelo: e.target.value })} /></label>
            <label>Color<input required maxLength={100} value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} /></label>
            <label>Fecha de última ITV<input type="date" required value={form.fechaUltimaITV} onChange={e => setForm({ ...form, fechaUltimaITV: e.target.value })} /></label>
          </div>
          <div className="check-row"><label className="check-label"><input type="checkbox" checked={form.seguroEnVigor} onChange={e => setForm({ ...form, seguroEnVigor: e.target.checked })} />Seguro en vigor</label></div>
        </fieldset>
        {error && <div className="form-alert" role="alert">{error}</div>}
        <div className="form-actions">
          <button className="button button--outline" type="button" disabled={saving} onClick={onCancel}>Cancelar</button>
          <button className="button button--accent" disabled={saving}>{saving ? 'Guardando…' : vehicle ? 'Guardar cambios' : 'Crear vehículo'}</button>
        </div>
      </form>
    </section>
  )
}
