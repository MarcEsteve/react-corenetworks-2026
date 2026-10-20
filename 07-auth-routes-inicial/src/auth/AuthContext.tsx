import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type User = { id: string; name: string; role?: "user" | "admin" };
type AuthContextType = {
  user: User | null;
  login: (name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // (Opcional) hidratar desde localStorage
  useEffect(() => {
    const raw = localStorage.getItem("auth:user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  // Simula API de login
  async function login(name: string) {
    // fake delay
    await new Promise(r => setTimeout(r, 400));
    const u: User = { id: crypto.randomUUID(), name, role: "user" };
    setUser(u);
    localStorage.setItem("auth:user", JSON.stringify(u));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("auth:user");
  }

  const value = useMemo(() => ({
    user, login, logout, isAuthenticated: !!user
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
