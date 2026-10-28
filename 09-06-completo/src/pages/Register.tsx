import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFirebaseErrorMessage } from "../context/authErrors";
import { useAuth } from "../context/useAuth";
import { isFirebaseConfigured } from "../firebaseConfig";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(name.trim(), email.trim(), password);
      navigate("/vehiculos", { replace: true });
    } catch (submitError) {
      setError(getFirebaseErrorMessage(submitError));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-layout">
      <div className="auth-aside">
        <span className="eyebrow">ACCESO DE OPERADORES</span>
        <h1>Empieza a<br />gestionar mejor.</h1>
        <p>Crea tu cuenta para registrar y consultar la flota de vehículos.</p>
        <div className="auth-aside-mark">DGT<span>·</span></div>
      </div>
      <div className="auth-card">
        <span className="eyebrow">NUEVA CUENTA</span>
        <h2>Crear cuenta</h2>
        <p className="auth-description">El registro crea un perfil con permisos de operador.</p>
        {!isFirebaseConfigured && <div className="form-alert" role="alert">Firebase no está configurado. Consulta el archivo README.</div>}
        {error && <div className="form-alert" role="alert">{error}</div>}
        <form className="form-stack" onSubmit={handleSubmit}>
          <label>Nombre y apellidos<input autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} required /></label>
          <label>Correo electrónico<input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label>Contraseña <span className="field-hint">(mínimo 6 caracteres)</span><input type="password" autoComplete="new-password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          <button className="button button--accent button--wide" disabled={submitting || !isFirebaseConfigured}>
            {submitting ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>
        <p className="auth-switch">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </div>
    </section>
  );
}
