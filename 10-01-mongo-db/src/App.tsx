import { useEffect, useState } from 'react'
import './App.css'

interface User {
  _id: string
  username: string
  name: string
  role: string
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/users')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(setUsers)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="dashboard">
      <header className="topbar">
        <a className="brand" href="./" aria-label="DGTDB, inicio">
          <span className="brand-icon" aria-hidden="true">D</span>
          <span>DGT<span className="brand-light">DB</span></span>
        </a>
        <span className="environment">MongoDB <span className="environment-divider">/</span> Directorio</span>
      </header>

      <section className="page-heading" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">EXPLORA TU BASE DE DATOS</p>
          <h1 id="page-title">Cada usuario, en un lugar.</h1>
          <p className="intro">Consulta los perfiles y roles de tu comunidad en DGTDB.</p>
        </div>
        <span className={`connection ${error ? 'connection-error' : ''}`}>
          <span className="status-dot" />
          {loading ? 'Conectando' : error ? 'Sin conexión' : 'Conectado a la API'}
        </span>
      </section>

      <section className="stats" aria-label="Resumen del directorio">
        <article className="stat-card">
          <span className="stat-label">Usuarios registrados</span>
          <strong>{loading || error ? '—' : users.length.toLocaleString('es-ES')}</strong>
          <span className="stat-caption">Perfiles en el directorio</span>
        </article>
        <article className="stat-card">
          <span className="stat-label">Roles diferentes</span>
          <strong>{loading || error ? '—' : new Set(users.map((user) => user.role)).size}</strong>
          <span className="stat-caption">Tipos de perfil asignados</span>
        </article>
        <article className="stat-card database-card">
          <span className="stat-label">Base de datos</span>
          <strong>DGTDB<span className="database-dot">.</span></strong>
          <span className="stat-caption">Colección de usuarios · MongoDB</span>
        </article>
      </section>

      <section className="directory" aria-labelledby="directory-title" aria-busy={loading}>
        <div className="directory-heading">
          <div><h2 id="directory-title">Directorio de usuarios</h2><p>Identidad y permisos de cada perfil.</p></div>
          {!loading && !error && <span className="count-badge">{users.length} {users.length === 1 ? 'usuario' : 'usuarios'}</span>}
        </div>
        {loading ? (
          <div className="state-message" role="status"><span className="spinner" /><h3>Cargando el directorio</h3><p>Estamos consultando los usuarios.</p></div>
        ) : error ? (
          <div className="state-message error-message" role="alert"><span className="state-icon" aria-hidden="true">!</span><h3>No se pudieron cargar los usuarios</h3><p>Comprueba que el servidor esté disponible e inténtalo de nuevo.</p><code>{error}</code><button onClick={() => window.location.reload()}>Volver a intentar</button></div>
        ) : users.length === 0 ? (
          <div className="state-message"><span className="state-icon" aria-hidden="true">○</span><h3>Tu directorio está por estrenar</h3><p>Los usuarios aparecerán aquí cuando se añadan a la base de datos.</p></div>
        ) : (
          <div className="table-scroll">
            <table>
              <caption className="sr-only">Usuarios registrados en DGTDB</caption>
              <thead><tr><th scope="col">Nombre</th><th scope="col">Usuario</th><th scope="col">Rol</th><th scope="col">ID de usuario</th></tr></thead>
              <tbody>{users.map((user) => (
                <tr key={user._id}>
                  <td><div className="user-profile"><span className="avatar" aria-hidden="true">{(user.name || user.username || '?').trim().slice(0, 2).toUpperCase()}</span><span className="user-name">{user.name || 'Sin nombre'}</span></div></td>
                  <td><span className="username">@{user.username}</span></td>
                  <td><span className="role-badge">{user.role || 'Sin rol'}</span></td>
                  <td><code className="user-id">{user._id}</code></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
        <div className="directory-footer"><span className="status-dot" /> Datos consultados desde /api/users</div>
      </section>
      <footer className="page-footer"><span>DGTDB · Directorio de usuarios</span><span>React + MongoDB</span></footer>
    </main>
  )
}

export default App
