import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, Link, useParams } from "react-router-dom";

// --- Datos “inline” solo para el test ---
const DATA = [
  { matricula: "1234ABC", marca: "Seat", modelo: "León" },
  { matricula: "5678XYZ", marca: "Renault", modelo: "Clio" },
];

// --- Lista con enlaces a /vehiculos/:matricula ---
function VehiculosList() {
  return (
    <div>
      <h1>Vehículos</h1>
      <ul>
        {DATA.map(v => (
          <li key={v.matricula}>
            <Link to={`/vehiculos/${v.matricula}`}>
              {v.marca} {v.modelo} · {v.matricula}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Detalle leyendo el parámetro con useParams ---
function VehiculoDetalle() {
  const { matricula } = useParams();
  const v = DATA.find(x => x.matricula === matricula);
  if (!v) return <h2>404 – Vehículo no encontrado</h2>;
  return (
    <div>
      <h2>Detalle</h2>
      <p data-testid="matricula">{v.matricula}</p>
      <p>{v.marca} {v.modelo}</p>
    </div>
  );
}

describe("React Router (mínimo) con MemoryRouter", () => {
  it("renderiza la lista y navega al detalle al hacer click", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/vehiculos"]}>
        <Routes>
          <Route path="/vehiculos" element={<VehiculosList />} />
          <Route path="/vehiculos/:matricula" element={<VehiculoDetalle />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </MemoryRouter>
    );

    // Lista visible
    expect(screen.getByRole("heading", { name: /vehículos/i })).toBeInTheDocument();
    // Click en el primer enlace
    await user.click(screen.getByRole("link", { name: /Seat León · 1234ABC/i }));

    // Ahora estamos en /vehiculos/1234ABC → detalle visible
    expect(screen.getByRole("heading", { name: /detalle/i })).toBeInTheDocument();
    expect(screen.getByTestId("matricula")).toHaveTextContent("1234ABC");
    expect(screen.getByText(/Seat León/i)).toBeInTheDocument();
  });

  it("muestra 404 si la matrícula no existe", () => {
    render(
      <MemoryRouter initialEntries={["/vehiculos/NOEXISTE"]}>
        <Routes>
          <Route path="/vehiculos" element={<VehiculosList />} />
          <Route path="/vehiculos/:matricula" element={<VehiculoDetalle />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/vehículo no encontrado/i)).toBeInTheDocument();
  });
});
