export default function NoEncontrado404() {
  return (
    <>
      <h1>404 - No encontrado</h1>
      <p>La página que estás buscando no existe.</p>
      <button onClick={() => window.location.href = "/"}>Volver al inicio</button>
    </>
  );
}
