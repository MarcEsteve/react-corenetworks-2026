import { Link } from "react-router-dom";

export default function NoAcceso() {
  return <section className="message-page"><span className="message-code">403</span><h1>Acceso restringido</h1><p>Tu cuenta no tiene permisos para consultar esta sección.</p><Link className="button button--accent" to="/vehiculos">Volver a vehículos</Link></section>;
}
