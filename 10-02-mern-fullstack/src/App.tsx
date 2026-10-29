import { useEffect, useState } from 'react'
import { vehiculosApi } from './api/vehiculos'
import VehiculoForm from './components/VehiculoForm'
import type { Vehiculo, VehiculoInput } from './types/vehiculo'
import './App.css'

export default function App() {
  const [vehicles, setVehicles] = useState<Vehiculo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<Vehiculo | null>(null)
  const [adding, setAdding] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    vehiculosApi.list(controller.signal).then(setVehicles).catch(error => {
      if (!controller.signal.aborted) setError(error instanceof Error ? error.message : 'No se pudieron cargar los vehículos.')
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(false)
    })
    return () => controller.abort()
  }, [refresh])

  async function save(data: VehiculoInput) {
    const vehicle = editing
      ? await vehiculosApi.update(editing._id, data)
      : await vehiculosApi.create(data)
    setVehicles(current => editing ? current.map(item => item._id === vehicle._id ? vehicle : item) : [...current, vehicle])
    setNotice(editing ? 'Vehículo actualizado.' : 'Vehículo creado.')
    setEditing(null)
    setAdding(false)
  }

  async function remove(vehicle: Vehiculo) {
    if (deleting || !window.confirm(`¿Eliminar el vehículo ${vehicle.matricula}?`)) return
    setDeleting(vehicle._id)
    setError('')
    try {
      await vehiculosApi.remove(vehicle._id)
      setVehicles(current => current.filter(item => item._id !== vehicle._id))
      setNotice('Vehículo eliminado.')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'No se pudo eliminar el vehículo.')
    } finally {
      setDeleting(null)
    }
  }

  const normalized = query.trim().toLocaleLowerCase('es')
  const filtered = vehicles.filter(vehicle => [vehicle.matricula, vehicle.marca, vehicle.modelo, vehicle.color]
    .some(value => value.toLocaleLowerCase('es').includes(normalized)))
    .sort((a, b) => a.matricula.localeCompare(b.matricula))

  return (
    <div className="app-shell">
      <header className="topbar"><div className="brand"><span className="brand-logo"><img src={`${import.meta.env.BASE_URL}assets/logo_dgt.svg`} alt="Dirección General de Tráfico" width="100" height="50" /></span><div className="brand-name">Gestión de vehículos<small>MongoDB Atlas · Express · React</small></div></div></header>
      <main className="main-content">
        <section className="workspace">
          <div className="page-heading"><div><span className="eyebrow">REGISTRO DE VEHÍCULOS</span><h1>Vehículos</h1><p>Consulta y actualiza la información de la flota.</p></div><button className="button button--accent" disabled={loading || deleting !== null} onClick={() => { setEditing(null); setAdding(true) }}>＋ Añadir vehículo</button></div>
          <div className="summary-row">
            <div className="summary-card"><div><small>VEHÍCULOS REGISTRADOS</small><strong>{loading ? '—' : vehicles.length}</strong></div></div>
            <div className="summary-card"><div><small>SEGURO EN VIGOR</small><strong>{loading ? '—' : vehicles.filter(v => v.seguroEnVigor).length}</strong></div></div>
            <div className="summary-card"><div><small>SIN SEGURO EN VIGOR</small><strong>{loading ? '—' : vehicles.filter(v => !v.seguroEnVigor).length}</strong></div></div>
          </div>
          {notice && (
            <div className="form-alert form-alert--success" role="status" aria-atomic="true">
              <span className="success-icon" aria-hidden="true">✓</span>
              <span className="success-message">{notice}</span>
              <button type="button" className="icon-button success-dismiss" aria-label="Cerrar aviso" onClick={() => setNotice('')}>×</button>
            </div>
          )}
          {error && <div className="form-alert" role="alert">{error} <button className="button button--outline" disabled={loading || deleting !== null} onClick={() => setRefresh(v => v + 1)}>Reintentar carga</button></div>}
          <div className="table-panel">
            <div className="panel-heading"><div><h2>Listado de vehículos</h2><p>{filtered.length} resultados</p></div><label className="search-field"><input aria-label="Buscar vehículos" placeholder="Matrícula, marca, modelo o color…" value={query} onChange={e => setQuery(e.target.value)} /></label></div>
            {loading ? <div className="empty-state">Cargando vehículos…</div> : filtered.length === 0 ? <div className="empty-state">{error ? 'No se pudo obtener el listado.' : vehicles.length ? 'No hay coincidencias.' : 'No hay vehículos. Añade el primero.'}</div> : (
              <div className="table-scroll"><table className="vehicle-table"><thead><tr><th>MATRÍCULA</th><th>VEHÍCULO</th><th>COLOR</th><th>ÚLTIMA ITV</th><th>SEGURO</th><th>ACCIONES</th></tr></thead>
                <tbody>{filtered.map(vehicle => <tr key={vehicle._id}>
                  <td><span className="table-plate">{vehicle.matricula}</span></td>
                  <td><strong>{vehicle.marca} {vehicle.modelo}</strong></td><td>{vehicle.color}</td>
                  <td>{vehicle.fechaUltimaITV ? vehicle.fechaUltimaITV.slice(0, 10).split('-').reverse().join('/') : 'Sin fecha'}</td>
                  <td><span className={`status-badge ${vehicle.seguroEnVigor ? 'status-badge--ok' : 'status-badge--warning'}`}>{vehicle.seguroEnVigor ? 'En vigor' : 'No vigente'}</span></td>
                  <td><div className="row-actions"><button className="icon-button" disabled={deleting !== null} aria-label={`Editar ${vehicle.matricula}`} onClick={() => setEditing(vehicle)}>✎</button><button className="icon-button icon-button--delete" disabled={deleting !== null} aria-label={`Eliminar ${vehicle.matricula}`} onClick={() => void remove(vehicle)}>{deleting === vehicle._id ? '…' : '⌫'}</button></div></td>
                </tr>)}</tbody></table></div>
            )}
          </div>
        </section>
      </main>
      <footer className="site-footer">Curso React · CRUD de vehículos</footer>
      {(adding || editing) && <div className="modal-backdrop"><VehiculoForm key={editing?._id ?? 'new'} vehicle={editing ?? undefined} onSubmit={save} onCancel={() => { setAdding(false); setEditing(null) }} /></div>}
    </div>
  )
}
