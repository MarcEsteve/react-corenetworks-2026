import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { auth, db } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

function mapAuthError(code?: string) {
  switch (code) {
    case "auth/email-already-in-use": return "Este email ya está registrado.";
    case "auth/invalid-email": return "Formato de email inválido.";
    case "auth/weak-password": return "Contraseña demasiado débil (mín. 6).";
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password": return "Credenciales incorrectas.";
    case "auth/network-request-failed": return "No se pudo conectar. Revisa tu conexión.";
    case "auth/too-many-requests": return "Demasiados intentos. Inténtalo más tarde.";
    case "auth/operation-not-allowed": return "Activa Email/Contraseña en Firebase Authentication.";
    default: return "Error de autenticación.";
  }
}

export default function Login() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passOk = pass.length >= 6;
  const passMatch = pass === pass2 || mode === "login";
  const nombreOk = mode === "login" ? true : nombre.trim().length >= 2;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOk(null); setErr(null);

    if (!emailOk) return setErr("Email no válido");
    if (!passOk) return setErr("La contraseña debe tener mínimo 6 caracteres");
    if (!passMatch) return setErr("Las contraseñas no coinciden");
    if (!nombreOk) return setErr("Introduce tu nombre (mín. 2 letras)");

    try {
      setLoading(true);

      if (mode === "register") {
        const cred = await createUserWithEmailAndPassword(auth, email, pass);

        try {
          // Opcional: poner displayName en el perfil de Auth
          if (nombre) {
            await updateProfile(cred.user, { displayName: nombre });
          }

          // Guardar perfil en Firestore (colección "usuarios", doc = uid)
          await setDoc(doc(db, "usuarios", cred.user.uid), {
            uid: cred.user.uid,
            email,
            nombre,
            createdAt: serverTimestamp(),
          });
        } catch {
          setErr("La cuenta se ha creado, pero no se pudo guardar el perfil. Revisa Firestore. Puedes iniciar sesión con tu email y contraseña.");
          return;
        }

        setOk("✅ Cuenta creada y perfil guardado.");
      } else {
        await signInWithEmailAndPassword(auth, email, pass);
        setOk("✅ Sesión iniciada.");
      }
    } catch (e: unknown) {
      setErr(mapAuthError(e instanceof FirebaseError ? e.code : undefined));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 380, margin: "24px auto" }}>
      <h2>{mode === "register" ? "Registro" : "Login"} (Avanzado)</h2>

      <form noValidate onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
        {mode === "register" && (
          <input
            aria-label="Nombre"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoComplete="name"
          />
        )}
        <input
          aria-label="Correo electrónico"
          type="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          type="password"
          aria-label="Contraseña"
          placeholder="Contraseña (mín. 6)"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
        />
        {mode === "register" && (
          <input
            type="password"
            aria-label="Repite la contraseña"
            placeholder="Repite la contraseña"
            value={pass2}
            onChange={(e) => setPass2(e.target.value)}
            autoComplete="new-password"
          />
        )}

        <button disabled={loading}>
          {loading ? "Procesando…" : mode === "register" ? "Crear cuenta" : "Entrar"}
        </button>
      </form>

      {err && <p role="alert" style={{ color: "crimson", marginTop: 8 }}>{err}</p>}
      {ok && <p role="status" style={{ color: "seagreen", marginTop: 8 }}>{ok}</p>}

      <button
        disabled={loading}
        onClick={() => {
          setMode(mode === "register" ? "login" : "register");
          setErr(null);
          setOk(null);
        }}
        style={{ marginTop: 10 }}
      >
        Cambiar a {mode === "register" ? "Login" : "Registro"}
      </button>
    </div>
  );
}
