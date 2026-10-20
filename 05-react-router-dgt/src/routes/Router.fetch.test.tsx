import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Vehiculos from "../routes/Vehiculos";
import VehiculoDetalle from "../routes/VehiculoDetalle";
import { vehiculosLoader, vehiculoDetalleLoader } from "../router";

const MOCK_DATA = [
  { matricula: "1234ABC", marca: "Seat", modelo: "León", color: "Gris", seguroEnVigor: true,  fechaUltimaITV: "2024-06-10" },
  { matricula: "5678XYZ", marca: "Renault", modelo: "Clio", color: "Rojo", seguroEnVigor: false, fechaUltimaITV: "2023-11-02" },
];

beforeEach(() => {
  // Mock global fetch
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue(MOCK_DATA),
  } as any));
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

const routes = [
  { path: "/vehiculos", element: <Vehiculos />, loader: vehiculosLoader },
  {
    path: "/vehiculos/:matricula",
    element: <VehiculoDetalle />,
    loader: vehiculoDetalleLoader,
    errorElement: <h1>404</h1>,
  },
  { path: "*", element: <h1>404</h1> },
];

describe("React Router con componentes reales y fetch mockeado", () => {
  it("lista vehículos y navega al detalle", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, {
      initialEntries: ["/vehiculos"],
    });

    render(<RouterProvider router={router} />);

    // Espera a que la lista esté en el DOM (uno de los elementos)
    expect(await screen.findByText(/Seat/i)).toBeInTheDocument();

    // Click en el enlace del primer vehículo
    const enlacesDetalle = screen.getAllByRole("link", { name: /ver detalle/i });
    await user.click(enlacesDetalle[0]);

    // El detalle debe mostrar la matrícula y otros datos
    expect(await screen.findByText(/Detalle/i)).toBeInTheDocument();
    expect(screen.getByText(/1234ABC/i)).toBeInTheDocument();
    expect(screen.getByText(/Seat León/i)).toBeInTheDocument();
  });

  it("muestra 404 si la matrícula no existe", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/vehiculos/NOEXISTE"],
    });

    render(<RouterProvider router={router} />);

    // Como el detalle busca por matrícula y no la encuentra, se dispara el errorElement con 404
    expect(await screen.findByText(/404/i)).toBeInTheDocument();
  });
});
