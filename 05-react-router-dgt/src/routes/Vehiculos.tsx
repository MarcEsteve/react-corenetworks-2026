import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import type { Vehiculo } from "../types/vehiculo";

type LoaderData = { vehiculos: Vehiculo[] };

export default function Vehiculos() {
  const { vehiculos } = useLoaderData() as LoaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const filtroColor = searchParams.get("color") || "";

  const filtrados = filtroColor
    ? vehiculos.filter(v => v.color.toLowerCase() === filtroColor.toLowerCase())
    : vehiculos;

  return (
    <>
      <h1>🚗 Vehículos</h1>

      <div className="dgt-filtros">
        <input
          placeholder="Filtrar por color…"
          defaultValue={filtroColor}
          onChange={(e) => {
            const val = e.target.value.trim();
            if (val) setSearchParams({ color: val }); else setSearchParams({});
          }}
        />
        {filtroColor && <button onClick={() => setSearchParams({})}>Limpiar</button>}
      </div>

      <ul className="dgt-lista">
        {filtrados.map((v) => (
          <li key={v.matricula} className="dgt-tarjeta">
            <strong>{v.marca} {v.modelo}</strong> · {v.color}
            <div>Matrícula: <code>{v.matricula}</code></div>
            <span className={`dgt-estado ${v.seguroEnVigor ? "dgt-estado--ok" : "dgt-estado--ko"}`}>
              {v.seguroEnVigor ? "Seguro en vigor" : "Seguro caducado"}
            </span>
            <div style={{ marginTop: 8 }}>
              <Link to={`/vehiculos/${v.matricula}`}>Ver detalle</Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
