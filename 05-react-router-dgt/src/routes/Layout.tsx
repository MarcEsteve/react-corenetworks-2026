import { NavLink, Outlet, useNavigation } from "react-router-dom";

export default function Layout() {
  const navigation = useNavigation(); // pending/idle

  return (
    <>
      <header className="dgt-header">
        <div className="dgt-header__inner">
          <div className="dgt-marca">
            <span className="dgt-marca__sigla">DGT</span>
            <span className="dgt-marca__nombre">
              Dirección General
              <br />
              de Tráfico
            </span>
          </div>
          <nav className="dgt-nav">
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/vehiculos">Vehículos</NavLink>
          </nav>
        </div>
      </header>

      <main className="dgt-main">
        {navigation.state === "loading" && (
          <div className="dgt-cargando">⏳ Cargando…</div>
        )}

        <Outlet />
      </main>

      <footer className="dgt-footer">
        <small>© Portal DGT (demo)</small>
      </footer>
    </>
  );
}
