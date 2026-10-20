import IndicadorAlerta from "./components/IndicadorAlerta";
import BotonAlerta from "./components/BotonAlerta";

export default function App() {
  return (
    <main style={{ padding: 16 }}>
      <h1>Context API - Estado global mínimo</h1>
      <IndicadorAlerta />
      <BotonAlerta />
    </main>
  );
}
