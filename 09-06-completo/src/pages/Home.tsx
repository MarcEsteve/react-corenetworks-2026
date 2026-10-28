import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { isFirebaseConfigured } from "../firebaseConfig";

export default function Home() {
  const { user, loading } = useAuth();
  if (loading) return <div className="page-loading">Cargando portal...</div>;
  if (user) return <Navigate to="/vehiculos" replace />;

  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow"><span className="status-dot" /> PLATAFORMA DE GESTIÓN DGT</span>
        <h1>Todos los vehículos.<br /><span>Un solo lugar.</span></h1>
        <p>Administra matrículas, datos técnicos y vigencia documental desde un espacio de trabajo seguro y centralizado.</p>
        <div className="hero-actions">
          <Link className="button button--accent" to="/login">Entrar en la plataforma <span aria-hidden="true">→</span></Link>
          <Link className="button button--outline" to="/registro">Crear cuenta</Link>
        </div>
        {!isFirebaseConfigured && (
          <p className="setup-note">Para activar el acceso, configura las variables de Firebase siguiendo el README.</p>
        )}
        <div className="hero-proof"><span className="proof-icon">✓</span> Acceso protegido · Datos en Firestore · Roles de usuario</div>
      </div>
      <div className="hero-visual" aria-label="Resumen visual de la gestión de vehículos">
        <div className="visual-glow" />
        <div className="visual-card visual-card--main">
          <div className="visual-card-head"><span>FICHA DE VEHÍCULO</span><span className="live-tag">ACTIVO</span></div>
          <div className="plate">4821&nbsp; LKM</div>
          <div className="car-name">SEAT León <span>2022</span></div>
          <div className="visual-divider" />
          <div className="visual-metrics">
            <div><small>ITV</small><strong className="metric-ok">Vigente</strong></div>
            <div><small>SEGURO</small><strong className="metric-ok">Vigente</strong></div>
            <div><small>ENERGÍA</small><strong>Híbrido</strong></div>
          </div>
        </div>
        <div className="floating-stat"><span className="stat-icon">↗</span><div><strong>Control sencillo</strong><small>Información siempre disponible</small></div></div>
        <div className="visual-orbit visual-orbit--one" />
        <div className="visual-orbit visual-orbit--two" />
      </div>
    </section>
  );
}
