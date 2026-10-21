import {
  createContext, useContext, useEffect, useMemo, useState, type ReactNode,
} from "react";

type Role = "user" | "admin";

export type User = { username: string; name: string; role: Role };

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Hidratar de localStorage (opcional)
  useEffect(() => {
    const raw = localStorage.getItem("auth:user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  async function login(username: string, password: string) {
    // DEMO: consulta al JSON público
    const res = await fetch("/data/usuarios.json");
    if (!res.ok) return false;
    const users: Array<User & { password: string }> = await res.json();

    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (found) {
      const { password: _omit, ...safeUser } = found;
      setUser(safeUser);
      localStorage.setItem("auth:user", JSON.stringify(safeUser));
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("auth:user");
  }

  const value = useMemo<AuthContextType>(
    () => ({ user, isAuthenticated: !!user, login, logout }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
