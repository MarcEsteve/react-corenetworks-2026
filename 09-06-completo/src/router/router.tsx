import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import RoleRoute from "../components/RoleRoute";
import AjustesPage from "../pages/AjustesPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NoAcceso from "../pages/NoAcceso";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import UsuariosPage from "../pages/UsuariosPage";
import VehiculosPage from "../pages/VehiculosPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Register />} />
          <Route path="no-acceso" element={<NoAcceso />} />
          <Route element={<ProtectedRoute />}>
            <Route path="vehiculos" element={<VehiculosPage />} />
            <Route element={<RoleRoute allowedRoles={["admin"]} />}>
              <Route path="usuarios" element={<UsuariosPage />} />
              <Route path="ajustes" element={<AjustesPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
