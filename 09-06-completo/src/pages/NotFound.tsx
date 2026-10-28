import { Link } from "react-router-dom";

export default function NotFound() {
  return <section className="message-page"><span className="message-code">404</span><h1>Página no encontrada</h1><p>La dirección que buscas no existe o ha cambiado.</p><Link className="button button--accent" to="/">Volver al inicio</Link></section>;
}
