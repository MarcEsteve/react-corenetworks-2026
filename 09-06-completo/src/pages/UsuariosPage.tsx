import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useAppDispatch } from "../app/hooks";
import { db } from "../firebaseConfig";
import { useAuth } from "../context/useAuth";
import type { UserRole } from "../context/auth-context";
import { showNotice } from "../features/ui/uiSlice";

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
}

export default function UsuariosPage() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    if (!db) {
      setError("Configura Firebase para consultar los usuarios.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const snapshot = await getDocs(collection(db, "users"));
      setUsers(snapshot.docs.map((userDoc) => {
        const data = userDoc.data();
        return {
          uid: userDoc.id,
          email: typeof data.email === "string" ? data.email : "",
          displayName: typeof data.displayName === "string" ? data.displayName : "",
          role: data.role === "admin" ? "admin" : "operador",
        };
      }));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "No se pudo cargar el listado de usuarios.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  async function changeRole(profile: UserProfile, role: UserRole) {
    if (!db) return;
    try {
      await updateDoc(doc(db, "users", profile.uid), { role });
      setUsers((current) => current.map((item) => item.uid === profile.uid ? { ...item, role } : item));
      dispatch(showNotice({ kind: "success", message: `Rol actualizado para ${profile.email}.` }));
    } catch (updateError) {
      dispatch(showNotice({
        kind: "error",
        message: updateError instanceof Error ? updateError.message : "No se pudo actualizar el rol.",
      }));
    }
  }

  return (
    <section className="workspace">
      <div className="page-heading">
        <div><span className="eyebrow">ADMINISTRACIÓN</span><h1>Usuarios</h1><p>Consulta las cuentas y administra sus permisos.</p></div>
        <span className="role-pill role-pill--large">Solo administradores</span>
      </div>
      <div className="table-panel">
        <div className="panel-heading"><div><h2>Cuentas registradas</h2><p>{users.length} usuarios</p></div></div>
        {loading ? <div className="empty-state">Cargando usuarios...</div> : error ? (
          <div className="empty-state empty-state--error"><strong>No se ha podido cargar el listado</strong><span>{error}</span><button className="button button--outline" onClick={() => void loadUsers()}>Reintentar</button></div>
        ) : users.length === 0 ? <div className="empty-state">Todavía no hay cuentas registradas.</div> : (
          <div className="table-scroll"><table className="vehicle-table users-table">
            <thead><tr><th>USUARIO</th><th>CORREO</th><th>PERFIL</th><th>PERMISOS</th></tr></thead>
            <tbody>{users.map((profile) => (
              <tr key={profile.uid}>
                <td><strong>{profile.displayName || "Sin nombre"}</strong>{profile.uid === user?.uid && <small className="table-subtext">Tu cuenta</small>}</td>
                <td>{profile.email}</td>
                <td><span className={`role-pill ${profile.role === "admin" ? "role-pill--admin" : ""}`}>{profile.role === "admin" ? "Administrador" : "Operador"}</span></td>
                <td><select aria-label={`Rol de ${profile.email}`} value={profile.role} disabled={profile.uid === user?.uid} onChange={(event) => void changeRole(profile, event.target.value as UserRole)}>
                  <option value="operador">Operador</option><option value="admin">Administrador</option>
                </select></td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </div>
    </section>
  );
}
