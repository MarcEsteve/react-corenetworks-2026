import {
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import Layout from "./routes/Layout";
import Home from "./routes/Home";
import Vehiculos from "./routes/Vehiculos";
import VehiculoDetalle from "./routes/VehiculoDetalle";
import type { Vehiculo } from "./types/vehiculo";

// Utilidad de fetch con manejo de error
async function getVehiculos(): Promise<Vehiculo[]> {
  const res = await fetch("/data/vehiculos.json");
  if (!res.ok) throw new Response("No se pudo cargar el listado", { status: res.status });
  return res.json();
}

// Loader listado
export async function vehiculosLoader() {
  const vehiculos = await getVehiculos();
  return { vehiculos };
}

// Loader detalle (busca por matrícula)
export async function vehiculoDetalleLoader({ params }: { params: { matricula?: string } }) {
  const { matricula } = params;
  if (!matricula) throw redirect("/vehiculos"); // sin parámetro → redirige

  const vehiculos = await getVehiculos();
  const v = vehiculos.find(x => x.matricula === matricula);

  if (!v) {
    throw new Response("Vehículo no encontrado", { status: 404, statusText: "No encontrado" });
  }
  return { vehiculo: v };
}

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <h1 style={{ padding: 24 }}>❌ Error de navegación</h1>,
    children: [
      { index: true, element: <Home /> },
      {
        path: "vehiculos",
        element: <Vehiculos />,
        loader: vehiculosLoader,
        errorElement: <p style={{ padding: 24 }}>⚠️ No se pudo cargar el listado.</p>,
      },
      {
        path: "vehiculos/:matricula",
        element: <VehiculoDetalle />,
        loader: vehiculoDetalleLoader,
        errorElement: <p style={{ padding: 24 }}>⚠️ Error al cargar el detalle.</p>,
      },
      { path: "*", element: <h1 style={{ padding: 24 }}>404 – No encontrado</h1> },
    ],
  },
]);
