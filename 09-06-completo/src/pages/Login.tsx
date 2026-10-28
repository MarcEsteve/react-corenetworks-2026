import { useState, type SubmitEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { getFirebaseErrorMessage } from "../context/authErrors";
import { isFirebaseConfigured } from "../firebaseConfig";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      const destination = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
      navigate(destination || "/vehiculos", { replace: true });
    } catch (submitError) {
      setError(getFirebaseErrorMessage(submitError));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-layout">
      <div className="auth-aside">
        <span className="eyebrow">PORTAL DGT</span>
        <h1>Tu espacio de<br />gestión, listo.</h1>
        <p>Accede al registro centralizado y mantén la información de cada vehículo al día.</p>
        <div className="auth-aside-mark">DGT<span>·</span></div>
      </div>
      <div className="auth-card">
        <span className="eyebrow">BIENVENIDO DE NUEVO</span>
        <h2>Iniciar sesión</h2>
        <p className="auth-description">Introduce tus credenciales para continuar.</p>
        {!isFirebaseConfigured && <div className="form-alert" role="alert">Firebase no está configurado. Consulta el archivo README.</div>}
        {error && <div className="form-alert" role="alert">{error}</div>}
        <form className="form-stack" onSubmit={handleSubmit}>
          <label>Correo electrónico<input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label>Contraseña<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
          <button className="button button--accent button--wide" disabled={submitting || !isFirebaseConfigured}>
            {submitting ? "Accediendo..." : "Acceder"}
          </button>
        </form>
        <p className="auth-switch">¿Aún no tienes cuenta? <Link to="/registro">Regístrate</Link></p>
      </div>
    </section>
  );
}
