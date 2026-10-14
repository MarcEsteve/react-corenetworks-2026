# React Router: SPA dinámica con Vehículos y DetalleVehículo

Aplicación de una sola página (SPA) sencilla que usa **React Router** para
navegar entre pantallas sin recargar el navegador. Sirve de ejemplo completo
de rutas: layout compartido, rutas anidadas, parámetros dinámicos, query
strings y página 404.

## 1. ¿Qué es una SPA?

En una *Single Page Application* el navegador carga un único `index.html`.
Al navegar, React Router cambia la URL y renderiza el componente
correspondiente, sin pedir una página nueva al servidor. La navegación es
instantánea y el estado de la aplicación se conserva.

## 2. Instalación y ejecución

```bash
npm install
npm run dev
```

La dependencia de enrutado es `react-router-dom`.

## 3. Estructura

```text
src/
  main.tsx                  # monta <BrowserRouter>
  App.tsx                   # tabla de rutas
  routes/
    Layout.tsx              # menú + <Outlet /> + pie
    Home.tsx                # /
    Vehiculos.tsx           # /vehiculos (listado + filtro)
    VehiculoDetalle.tsx     # /vehiculos/:matricula
    Nosotros.tsx            # /nosotros
    NoEncontrado404.tsx     # cualquier otra ruta
public/data/vehiculos.json  # datos de ejemplo
```

## 4. Activar el router: `BrowserRouter`

En [`src/main.tsx`](./src/main.tsx) se envuelve la aplicación con
`<BrowserRouter>`, que habilita el historial del navegador (URLs limpias y
botones atrás/adelante):

```tsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

## 5. Definir las rutas

En [`src/App.tsx`](./src/App.tsx) `<Routes>` elige qué componente mostrar
según la URL:

```tsx
<Routes>
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="vehiculos" element={<Vehiculos />} />
    <Route path="nosotros" element={<Nosotros />} />
    <Route path="vehiculos/:matricula" element={<VehiculoDetalle />} />
    <Route path="*" element={<NoEncontrado404 />} />
  </Route>
</Routes>
```

| URL                      | Componente        | Descripción                    |
| ------------------------ | ----------------- | ------------------------------ |
| `/`                      | `Home`            | Inicio                         |
| `/vehiculos`             | `Vehiculos`       | Listado con filtro por color   |
| `/vehiculos/:matricula`  | `VehiculoDetalle` | Detalle de un vehículo         |
| `/nosotros`              | `Nosotros`        | Información                    |
| `*`                      | `NoEncontrado404` | Cualquier ruta inexistente     |

Conceptos clave:

- **Ruta de layout:** la `<Route>` sin `path` que envuelve a las demás aplica
  el componente `Layout` a todas ellas.
- **Parámetro dinámico:** `:matricula` captura parte de la URL.
- **Comodín `*`:** se usa como página 404 cuando ninguna otra ruta coincide.

## 6. Layout compartido: `NavLink` y `Outlet`

[`src/routes/Layout.tsx`](./src/routes/Layout.tsx) contiene el menú y el pie
que se repiten en todas las páginas. `<Outlet />` marca el lugar donde se
pinta la página hija activa:

```tsx
<nav>
  <NavLink to="/" end>Inicio</NavLink>
  <NavLink to="/vehiculos">Vehículos</NavLink>
  <NavLink to="/nosotros">Nosotros</NavLink>
</nav>

<Outlet />
```

`NavLink` funciona como un enlace normal, pero informa de si está activo
(`isActive`), lo que permite subrayar la opción actual. `end` evita que `/`
se marque como activo en todas las rutas.

## 7. Listado: `Vehiculos`

[`src/routes/Vehiculos.tsx`](./src/routes/Vehiculos.tsx):

- Carga `public/data/vehiculos.json` con `fetch` dentro de `useEffect` y
  gestiona los estados de carga y error.
- Pinta cada vehículo y enlaza a su detalle con `<Link>`:

  ```tsx
  <Link to={`/vehiculos/${v.matricula}`}>Ver detalle</Link>
  ```

- **Query string con `useSearchParams`:** el filtro por color se guarda en la
  URL (`/vehiculos?color=Rojo`). Así el filtro se puede compartir, recargar o
  recuperar con el botón atrás.

  ```tsx
  const [searchParams, setSearchParams] = useSearchParams();
  const filtroColor = searchParams.get("color") || "";
  setSearchParams({ color: val });
  ```

## 8. Detalle: `VehiculoDetalle`

[`src/routes/VehiculoDetalle.tsx`](./src/routes/VehiculoDetalle.tsx):

- **`useParams`** lee el parámetro de la URL (`/vehiculos/1234ABC`):

  ```tsx
  const { matricula } = useParams<{ matricula: string }>();
  ```

- Busca el vehículo con esa matrícula entre los datos cargados
  (`useMemo` + `find`). Si no existe, muestra un mensaje 404.
- **`useNavigate`** permite navegar por código; `navigate(-1)` equivale a
  volver a la página anterior (con el filtro que hubiera en el listado).
- Muestra una advertencia si el seguro no está en vigor.

## 9. Página 404

[`src/routes/NoEncontrado404.tsx`](./src/routes/NoEncontrado404.tsx) se
asocia a la ruta `*`, por lo que se muestra con cualquier URL no definida,
por ejemplo `/otra-cosa`.

## 10. Flujo de la aplicación

1. El usuario entra en `/vehiculos` y se carga el listado.
2. Filtra por color; la URL pasa a `/vehiculos?color=Rojo`.
3. Pulsa "Ver detalle" y navega a `/vehiculos/<matrícula>` sin recargar.
4. Pulsa "Volver" y regresa al listado con el filtro intacto.

## 11. Resumen de herramientas de React Router

| Herramienta         | Uso                                         |
| ------------------- | ------------------------------------------- |
| `BrowserRouter`     | Activa el enrutado basado en la URL         |
| `Routes` / `Route`  | Declaran qué componente va con cada ruta    |
| `Outlet`            | Punto donde se pinta la ruta hija           |
| `Link` / `NavLink`  | Navegación sin recargar la página           |
| `useParams`         | Lee parámetros dinámicos (`:matricula`)     |
| `useSearchParams`   | Lee y modifica el query string (`?color=`)  |
| `useNavigate`       | Navegación programática (`navigate(-1)`)    |
