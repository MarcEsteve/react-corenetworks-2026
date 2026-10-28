import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { AuthContext, type AuthContextValue, type UserRole } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const firebaseAuth = auth;
    const firestore = db;
    if (!firebaseAuth || !firestore) {
      setLoading(false);
      return;
    }

    let active = true;
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (!active) return;
      setLoading(true);
      setAuthError(null);
      setUser(firebaseUser);

      if (!firebaseUser) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const profileRef = doc(firestore, "users", firebaseUser.uid);
        const profile = await getDoc(profileRef);

        if (!active) return;
        if (!profile.exists()) {
          await setDoc(profileRef, {
            uid: firebaseUser.uid,
            email: firebaseUser.email ?? "",
            ...(firebaseUser.displayName ? { displayName: firebaseUser.displayName } : {}),
            role: "operador",
            createdAt: serverTimestamp(),
          }, { merge: true });
          setRole("operador");
        } else {
          setRole(profile.data().role === "admin" ? "admin" : "operador");
        }
      } catch (error) {
        if (active) {
          setRole(null);
          setAuthError(
            error instanceof Error
              ? error.message
              : "No se pudo cargar el perfil de usuario.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      role,
      loading,
      authError,
      signIn: async (email, password) => {
        if (!auth) throw new Error("Configura Firebase para iniciar sesión.");
        setAuthError(null);
        setLoading(true);
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
          setLoading(false);
          throw error;
        }
      },
      register: async (name, email, password) => {
        if (!auth || !db) throw new Error("Configura Firebase para registrarte.");
        setAuthError(null);
        setLoading(true);
        try {
          const credential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          );
          await updateProfile(credential.user, { displayName: name });
          await setDoc(doc(db, "users", credential.user.uid), {
            uid: credential.user.uid,
            email,
            displayName: name,
            role: "operador",
            createdAt: serverTimestamp(),
          }, { merge: true });
        } catch (error) {
          setLoading(false);
          throw error;
        }
      },
      signOutUser: async () => {
        if (!auth) throw new Error("Firebase no está configurado.");
        await signOut(auth);
      },
    }),
    [authError, loading, role, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
