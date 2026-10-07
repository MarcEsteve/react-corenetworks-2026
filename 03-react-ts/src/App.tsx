// import React from "react";
import Titulo from './components/Titulo';
import Saludo from './components/Saludo';

export default function App() {
  return (
    <main style={{ padding: 24 }}>
      <Titulo />
      <Saludo nombre="Pedro" />
      <Saludo nombre="Raúl" />
      <Saludo nombre="Nuño" />
    </main>
  );
}

