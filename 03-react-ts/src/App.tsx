// import React from "react";
import Card from "./components/Card";
import Titulo from "./components/Titulo";

export default function App() {
  return (
    <main style={{ padding: 24 }}>
      <Titulo />
      <h1>Ejemplo de componentes</h1>
      <Card titulo="Primero" contenido="Este es mi primer componente Card." />
      <Card titulo="Segundo" contenido="Los componentes pueden repetirse." />
      <Card titulo="Tercero" contenido="Y cada uno tiene props distintas." />
    </main>
  );
}
