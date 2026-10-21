import { useEffect, useState } from "react";
import type { User } from "../types/user";
import { listUsers, createUser, updateUser, deleteUser } from "../services/rtdb";

export default function UsersCrud() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState<User["rol"]>("user");
  const [editId, setEditId] = useState<string | null>(null);

  async function refresh() {
    try {
      setLoading(true);
      const data = await listUsers();
      setUsers(data);
      setError(null);
    } catch (e: any) {
      setError(e.message ?? "Error cargando usuarios");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refresh(); }, []);

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    try {
      if (editId) {
        await updateUser(editId, { nombre, email, rol });
      } else {
        const id = await createUser({ nombre, email, rol });
        // opcional: push local sin relistar
        setUsers(prev => [...prev, { id, nombre, email, rol }]);
      }
      // reset form
      setNombre(""); setEmail(""); setRol("user"); setEditId(null);
      if (editId) await refresh();
    } catch (e: any) {
      setError(e.message ?? "Error guardando usuario");
    }
  }

  function onEdit(u: User) {
    setEditId(u.id!);
    setNombre(u.nombre);
    setEmail(u.email);
    setRol(u.rol);
  }

  async function onDelete(id?: string) {
    if (!id) return;
    if (!confirm("¿Eliminar usuario?")) return;
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (e: any) {
      setError(e.message ?? "Error eliminando usuario");
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "24px auto", padding: 16 }}>
        {/* Componente Header */}
      <h1>👥 Usuarios (Firebase RTDB)</h1>
        {/* Componente Formulario */}
      <form onSubmit={onSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 8, marginBottom: 16 }}>
        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <select value={rol} onChange={e => setRol(e.target.value as User["rol"])}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <button type="submit">{editId ? "Actualizar" : "Crear"}</button>
      </form>

      {loading && <p>Cargando…</p>}
      {error && <p style={{ color: "crimson" }}>⚠️ {error}</p>}

      {!loading && users.length === 0 && <p>No hay usuarios.</p>}

      {/* Componente Tabla */}
      {users.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Nombre</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Email</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Rol</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: 8 }}></th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{u.nombre}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{u.email}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{u.rol}</td>
                <td style={{ borderBottom: "1px solid #eee", padding: 8, textAlign: "right" }}>
                  <button onClick={() => onEdit(u)} style={{ marginRight: 8 }}>Editar</button>
                  <button onClick={() => onDelete(u.id)} style={{ color: "white", background: "#dc2626" }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}