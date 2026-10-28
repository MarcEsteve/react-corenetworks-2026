import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Panel from "./pages/Panel";
import Login from "./pages/Login";
import { useAuth } from "./context/useAuth";
import Home from "./pages/Home";

export default function App() {
  const { user, logout } = useAuth();

  return (
    <BrowserRouter>
      <header
        style={{ padding: "30px", background: "#003366", color: "white" }}
      >
        <h1>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            DGT App
          </Link>
        </h1>
        {user ? (
          <div style={{ float: "right" }}>
            👋 Hola {user.displayName || user.email}
            <button onClick={logout} style={{ marginLeft: 10 }}>
              Cerrar sesión
            </button>
          </div>
        ) : (
          <Link to="/login" style={{ color: "white", float: "right" }}>
            Iniciar sesión
          </Link>
        )}
        {user ? (
          <nav>
            <ul style={{ display: "inline", marginRight: 20 }}>
              <li>
                <Link
                  to="/panel"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Acceder al panel privado
                </Link>
              </li>
            </ul>
          </nav>
        ) : (
          ""
        )}
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/panel"
          element={
            <ProtectedRoute>
              <Panel />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<p>Página no encontrada</p>} />
      </Routes>
    </BrowserRouter>
  );
}
