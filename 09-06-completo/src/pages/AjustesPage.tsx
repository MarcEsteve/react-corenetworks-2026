import { Link } from "react-router-dom";

export default function AjustesPage() {
  return (
    <section className="workspace settings-page">
      <div className="page-heading">
        <div><span className="eyebrow">ADMINISTRACIÓN</span><h1>Ajustes</h1><p>Configuración del espacio de trabajo y sus permisos.</p></div>
      </div>
      <div className="settings-grid">
        <article className="settings-card"><span className="settings-icon">◉</span><div><span className="eyebrow">ACCESO</span><h2>Roles y permisos</h2><p>Los operadores pueden gestionar vehículos. Los administradores también gestionan usuarios y permisos.</p><Link to="/usuarios" className="text-link">Gestionar usuarios →</Link></div></article>
        <article className="settings-card"><span className="settings-icon settings-icon--blue">◇</span><div><span className="eyebrow">BASE DE DATOS</span><h2>Firebase Firestore</h2><p>La aplicación utiliza las colecciones <code>vehiculos</code> y <code>users</code>. Mantén las reglas de seguridad publicadas junto a esta aplicación.</p><a className="text-link" href="https://console.firebase.google.com/" target="_blank" rel="noreferrer">Abrir consola Firebase ↗</a></div></article>
      </div>
      <div className="info-banner"><strong>Primer administrador</strong><span>Las nuevas cuentas se registran como operadores. El primer rol de administrador debe asignarse desde la consola Firestore según las instrucciones del README.</span></div>
    </section>
  );
}
