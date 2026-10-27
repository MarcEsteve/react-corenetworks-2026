import { useMemo, useState } from "react";
import "./styles/dgt.css";

type Registro = { matricula: string; codigo: string };

// ✅ Dataset mínimo: B, C, ECO, CERO, SIN
const DATA: Registro[] = [
  { matricula: "0002BGP", codigo: "16TB" }, // → B
  { matricula: "0003HMC", codigo: "16TC" }, // → C
  { matricula: "0012KMT", codigo: "16TE" }, // → ECO
  { matricula: "0004DJP", codigo: "SIN DISTINTIVO" }, // → SIN
  { matricula: "9999XXX", codigo: "CERO" }, // → CERO (demo)
  { matricula: "5334FBB", codigo: "16TC" },
  { matricula: "CS4383AV", codigo: "SIN DISTINTIVO" }
];

// Normaliza la matrícula: mayúsculas, sin espacios/guiones
const normalizePlate = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, "");

// Decodifica el “código DGT” a distintivo oficial
const decodeDistintivo = (
  codigo: string
): "B" | "C" | "ECO" | "CERO" | "SIN" => {
  const x = codigo.trim().toUpperCase();
  if (x.includes("SIN")) return "SIN";
  if (x.includes("CERO") || x === "0" || x.includes("0 EMISION")) return "CERO";
  // Patrones habituales “16TB/16TC/16TE”, y variantes de moto “16MB/16MC”
  if (x.endsWith("B")) return "B";
  if (x.endsWith("C")) return "C";
  if (x.endsWith("E")) return "ECO";
  // Fallback: SIN
  return "SIN";
};

const BADGE_SRC: Record<string, string> = {
  CERO: "/assets/distintivos/cero.png",
  ECO: "/assets/distintivos/eco.png",
  C: "/assets/distintivos/c.png",
  B: "/assets/distintivos/b.png",
  SIN: "/assets/distintivos/sin.png",
};

export default function App() {
  const [query, setQuery] = useState("");
  const [encontrado, setEncontrado] = useState<{
    matricula: string;
    distintivo: string;
  } | null>(null);
  const [noMatch, setNoMatch] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = normalizePlate(query);
    const row = DATA.find((r) => r.matricula === normalized);
    if (!row) {
      setEncontrado(null);
      setNoMatch(true);
      return;
    }
    const distintivo = decodeDistintivo(row.codigo);
    setEncontrado({ matricula: row.matricula, distintivo });
    setNoMatch(false);
  };

  const imgSrc = useMemo(
    () => (encontrado ? BADGE_SRC[encontrado.distintivo] : ""),
    [encontrado]
  );

  return (
    <div className="dgt-app">
      <div className="logo-header">
        <img src="/assets/logo_dgt.svg" alt="DGT" width={222} />
      </div>
      <header className="dgt-header">
        <div className="dgt-brand">
          <h1>Consulta de distintivo ambiental</h1>
        </div>
        <p className="dgt-sub">
          Introduce la matrícula exacta para consultar el distintivo
        </p>
      </header>

      <main className="dgt-main">
        {/* Mejora: generar un componentes de <SearchForm className="tsx"></SearchForm> */}
        <form onSubmit={onSubmit} className="dgt-form">
          <input
            className="dgt-input"
            placeholder="Ej: 1234ABC"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Matrícula"
          />
          <button className="dgt-button">Buscar</button>
        </form>

        {/* 🔽 Resultado justo debajo del buscador */}
        {/* Mejora: generar un componentes de <BadgeCard className="tsx"></BadgeCard> */}
        {encontrado && (
          <section className="dgt-card">
            <div className="dgt-plate">{encontrado.matricula}</div>
            <div className="dgt-badge">
              <img
                src={imgSrc}
                alt={`Distintivo ${encontrado.distintivo}`}
                loading="lazy"
              />
              <p className="dgt-badge-label">{encontrado.distintivo}</p>
            </div>
          </section>
        )}

        {noMatch && query && (
          <p className="dgt-muted">
            No se ha encontrado la matrícula introducida.
          </p>
        )}
      </main>

      <footer className="dgt-footer">
        <small>© DGT · Demo educativa</small>
      </footer>
    </div>
  );
}
