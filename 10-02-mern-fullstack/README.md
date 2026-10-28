# MERN · CRUD de vehículos

Listado, búsqueda, creación, edición y eliminación de vehículos con React, Express y MongoDB Atlas. Reutiliza el estilo de `09-06-completo` con los campos de la colección `dgt_vehiculos.vehiculos`.

## 1. API de Express

Configura `server/.env` con `PORT=4000` y `MONGODB_URI` (tienes una plantilla en `server/.env.example`). La conexión real está excluida de Git. Requiere Node.js 22 o posterior.

Desde `10-02-mern-fullstack`:

```sh
cd server
npm install
npx nodemon index.js
```

Deja esta terminal abierta. Comprueba **http://localhost:4000/api/vehiculos**: debe devolver JSON. En Atlas, el usuario debe tener lectura/escritura en `dgt_vehiculos` y tu IP debe tener acceso de red.

## 2. React

En otra terminal, desde `10-02-mern-fullstack`:

```sh
npm install
npm run dev
```

Abre la URL de Vite. Su proxy envía `/api` a Express en el puerto `4000`. Si PowerShell bloquea npm/npx, usa `npm.cmd`/`npx.cmd`.

## Probar

- Pulsa **Añadir vehículo**, completa los campos y guarda.
- Usa **Editar** para modificarlo y **Eliminar** para borrarlo tras confirmar.
- Recarga la página para comprobar que los cambios persisten en Atlas.
- El formulario utiliza `matricula`, `marca`, `modelo`, `color`, `seguroEnVigor` y `fechaUltimaITV` (AAAA-MM-DD). MongoDB genera `_id`.

| Método | Ruta | Operación |
| --- | --- | --- |
| GET | `/api/vehiculos` | Listar |
| GET | `/api/vehiculos/:id` | Consultar uno |
| POST | `/api/vehiculos` | Crear |
| PUT | `/api/vehiculos/:id` | Actualizar los seis campos |
| DELETE | `/api/vehiculos/:id` | Eliminar |

El backend está en `server/` y el frontend en `src/`. Este ejercicio cubre el CRUD; no incorpora el login ni los roles de Firebase. La API no tiene autenticación.

Comprobaciones: `npm run build` y `npm run lint` en el frontend; `npm test` dentro de `server`. Las pruebas de API usan datos en memoria, sin modificar Atlas.
