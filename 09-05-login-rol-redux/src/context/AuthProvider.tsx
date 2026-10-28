import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { AuthContext } from "./authContext";
import type { Perfil } from "./authContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Perfil | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stopProfile: (() => void) | undefined;
    const stopAuth = onAuthStateChanged(auth, (firebaseUser) => {
      stopProfile?.();
      stopProfile = undefined;
      setUser(firebaseUser);
      setProfile(null);
      setError(null);
      setLoading(true);
      if (!firebaseUser) {
        setLoading(false);
        return;
      }
      // Escucha también el perfil creado después de registrar la cuenta.
      stopProfile = onSnapshot(doc(db, "usuarios", firebaseUser.uid), (snap) => {
        const data = snap.data();
        setProfile(data ? {
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? "",
          nombre: typeof data.nombre === "string" ? data.nombre : undefined,
          role: data.role === "admin" ? "admin" : "user",
        } : null);
        setLoading(false);
        setError(null);
      }, () => {
        setProfile(null);
        setLoading(false);
        setError("No se pudo leer el perfil. Revisa los permisos de Firestore.");
      });
    });
    return () => {
      stopAuth();
      stopProfile?.();
    };
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      setError("No se pudo cerrar la sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout }}>
      {error && <p role="alert">{error}</p>}
      {children}
    </AuthContext.Provider>
  );
}
