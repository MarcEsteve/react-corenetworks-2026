import { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function AuthSimple() {
  const [mode, setMode] = useState<"login" | "register">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passOk = password.length >= 6;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null); setErr(null);
    if (!emailOk) return setErr("Email no válido");
    if (!passOk) return setErr("La contraseña debe tener mínimo 6 caracteres");

    try {
      setLoading(true);
      if (mode === "register") {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        // Guarda perfil mínimo en Firestore
        await setDoc(doc(db, "usuarios", res.user.uid), {
          uid: res.user.uid,
          email,
          createdAt: serverTimestamp(),
        });
        setMsg("Cuenta creada y guardada en Firestore ✅");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMsg("Sesión iniciada ✅");
      }
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Error de autenticación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "24px auto", display: "grid", gap: 8 }}>
      <h2>{mode === "register" ? "Registro" : "Login"} (Simple)</h2>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8 }}>
        <input
          type="email" placeholder="correo@ejemplo.com"
          value={email} onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password" placeholder="Contraseña (>=6)"
          value={password} onChange={e => setPassword(e.target.value)}
        />
        <button disabled={loading}>
          {loading ? "Procesando…" : mode === "register" ? "Crear cuenta" : "Entrar"}
        </button>
      </form>

      {err && <p style={{ color: "crimson" }}>{err}</p>}
      {msg && <p style={{ color: "seagreen" }}>{msg}</p>}

      <button
        onClick={() => setMode(mode === "register" ? "login" : "register")}
        style={{ marginTop: 8 }}
      >
        Cambiar a {mode === "register" ? "Login" : "Registro"}
      </button>
    </div>
  );
}
