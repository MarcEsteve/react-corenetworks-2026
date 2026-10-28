import { createContext } from "react";
import type { User } from "firebase/auth";

export type Role = "user" | "admin";
export type Perfil = { uid: string; email: string; nombre?: string; role: Role };
export interface AuthContextType {
  user: User | null;
  profile: Perfil | null;
  loading: boolean;
  logout: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
