import { createContext } from "react";
import type { User } from "firebase/auth";

export type UserRole = "admin" | "operador";

export interface AuthContextValue {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  authError: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
