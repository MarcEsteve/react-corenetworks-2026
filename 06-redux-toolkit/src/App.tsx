import IndicadorAlertaRedux from "./components/IndicadorAlertaRedux";
import BotonAlertaRedux from "./components/BotonAlertaRedux";
import ContadorToggles from "./components/ContadorToggles";

export default function App() {
  return (
    <main style={{ padding: 16 }}>
      <h1>Redux Toolkit - Estado global mínimo</h1>
      <IndicadorAlertaRedux />
      <BotonAlertaRedux />
      <ContadorToggles />      
    </main>
  );
}
