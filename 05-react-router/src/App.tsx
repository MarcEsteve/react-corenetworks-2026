import { Routes, Route } from "react-router-dom";
import Layout from "./routes/Layout";
import Home from "./routes/Home";
import Vehiculos from "./routes/Vehiculos";
import VehiculoDetalle from "./routes/VehiculoDetalle";
import Nosotros from "./routes/Nosotros";
import NoEncontrado404 from "./routes/NoEncontrado404";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="vehiculos" element={<Vehiculos />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="vehiculos/:matricula" element={<VehiculoDetalle />} />
        <Route path="*" element={<NoEncontrado404 />} />
      </Route>
    </Routes>
  );
}