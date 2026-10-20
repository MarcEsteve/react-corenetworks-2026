import { createContext, useContext, useState, type ReactNode } from "react";

type EstadoAlerta = { activas: boolean };
type Ctx = {
  estado: EstadoAlerta;
  toggle: () => void;
  activar: () => void;
  desactivar: () => void;
};

const AlertaContext = createContext<Ctx | null>(null);

export function AlertaProvider({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<EstadoAlerta>({ activas: false });

  const toggle = () => setEstado(s => ({ activas: !s.activas }));
  const activar = () => setEstado({ activas: true });
  const desactivar = () => setEstado({ activas: false });

  return (
    <AlertaContext.Provider value={{ estado, toggle, activar, desactivar }}>
      {children}
    </AlertaContext.Provider>
  );
}

// Hook para usarlo cómodamente
export function useAlerta() {
  const ctx = useContext(AlertaContext);
  if (!ctx) throw new Error("useAlerta debe usarse dentro de <AlertaProvider>");
  return ctx;
}
