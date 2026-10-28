import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

export default function FirestoreDemo() {
  const [usuarios, setUsuarios] = useState<{ id: string; nombre?: string; email?: string; phone?: string }[]>([]);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Leer documentos de la colección "usuarios"
  const cargarUsuarios = async () => {
    const snapshot = await getDocs(collection(db, "usuarios"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsuarios(data);
  };

  // Añadir nuevo documento
  const agregarUsuario = async () => {
    if (!nombre || !email || !phone) return;
    await addDoc(collection(db, "usuarios"), { nombre, email, phone });
    setNombre("");
    setEmail("");
    setPhone("");
    cargarUsuarios(); // actualizar lista
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);


  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Firestore Demo</h2>
        
      <input
        type="text"
        placeholder="Nuevo usuario"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Teléfono"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={agregarUsuario}>Agregar</button>

    <h2>Lista de usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
