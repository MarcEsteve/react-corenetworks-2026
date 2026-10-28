# CRUD Vehículos WebApp React Completa

Aplicación web para que operadores de la DGT gestionen un registro de vehículos (alta, consulta, edición y baja) con acceso autenticado y permisos por rol. Es la integración final de los ejercicios anteriores del repositorio: rutas (`05-react-router-dgt`), estado global (`06-redux-toolkit`), CRUD en Firestore (`09-02-crud-vehiculos`) y autenticación (`09-03-firebase-authentication`).

## Tecnologías

| Área | Herramienta |
|------|-------------|
| UI | React 19 + TypeScript + Vite |
| Navegación | React Router 7 (rutas públicas, privadas y por rol) |
| Estado | Redux Toolkit (`vehiculos`, `ui`) con `createAsyncThunk` |
| Autenticación | Firebase Authentication (correo y contraseña) |
| Datos | Cloud Firestore (`vehiculos`, `users`) |

## Funcionalidad

- **Acceso:** registro e inicio de sesión; la sesión se mantiene al recargar.
- **Vehículos:** listado con buscador (matrícula, marca, modelo, combustible), contadores de ITV y seguro vigentes, y alta/edición en un modal con borrado confirmado.
- **Usuarios (admin):** listado de cuentas y cambio de rol `operador` / `admin`.
- **Ajustes (admin):** información de roles y de las colecciones usadas.
- **Avisos:** mensajes de éxito y error globales gestionados desde Redux.

## Rutas y permisos

| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/` | Público | Portada; redirige a `/vehiculos` si hay sesión |
| `/login`, `/registro` | Público | Autenticación |
| `/vehiculos` | Usuario autenticado | CRUD de vehículos |
| `/usuarios`, `/ajustes` | Solo `admin` | Administración |
| `/no-acceso` | Público | Acceso denegado (403) |
| `*` | Público | Página 404 |

Sin sesión, las rutas privadas redirigen a `/login` y, tras entrar, vuelven a la ruta solicitada. Las rutas de administración con rol insuficiente redirigen a `/no-acceso`.

> Los guards del cliente solo mejoran la experiencia. La seguridad real la aplican las reglas de Firestore (`firestore.rules`).

## Puesta en marcha

```bash
cd 09-06-completo
npm install
npm run dev
```

### 1. Configuración de Firebase

La app lee su configuración de variables de entorno de Vite. Copia `.env.example` como `.env.local` (ignorado por Git) y rellena los valores de tu aplicación web de Firebase:

```text
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
```

Son obligatorias esas tres. Auth y Firestore no necesitan `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID` ni `VITE_FIREBASE_APP_ID`, aunque `firebaseConfig.ts` los acepta. Si faltan las obligatorias, la interfaz carga, pero el acceso y el CRUD quedan desactivados y se muestra un aviso.

> La clave de una app web de Firebase es un identificador público, no un secreto. Lo que protege los datos son las reglas de Firestore y los dominios autorizados en Authentication.

### 2. Preparar el proyecto en Firebase Console

1. **Authentication → Método de acceso:** habilita *Correo electrónico/contraseña*.
2. **Firestore Database:** crea la base de datos si no existe.
3. **Firestore → Reglas:** publica el contenido de `firestore.rules`.
4. Si despliegas la app, añade tu dominio en *Authentication → Configuración → Dominios autorizados*.

Si el proyecto lo comparten otros ejercicios (p. ej. `09-02`), ten en cuenta que estas reglas son más estrictas y pueden bloquearlos.

### 3. Crear el primer administrador

El registro público crea siempre cuentas con rol `operador`.

1. Regístrate en `/registro` (se crea `users/{uid}` con `role: "operador"`).
2. En Firestore, edita ese documento y cambia `role` a `admin`.
3. Cierra sesión y vuelve a entrar. Desde `/usuarios` ya puedes gestionar al resto.

## Modelo de datos

**`vehiculos/{id}`**

| Campo | Tipo | Valores |
|-------|------|---------|
| `matricula` | string | Se guarda en mayúsculas |
| `marca`, `modelo` | string | |
| `anioMatriculacion` | number (entero) | 1900 – año actual |
| `combustible` | string | Gasolina, Diésel, Eléctrico, Híbrido, GLP |
| `itvVigente`, `seguroVigente` | boolean | |
| `createdBy` | string | UID del creador |

**`users/{uid}`:** `uid`, `email`, `displayName`, `role` (`admin` | `operador`), `createdAt`.

## Reglas de seguridad (resumen)

- **Vehículos:** cualquier usuario autenticado puede leerlos, crearlos, editarlos y borrarlos. Las escrituras validan campos, tipos y combustible, y `createdBy` debe ser el usuario que crea y no cambia al editar.
- **Usuarios:** cada cuenta solo puede crear su propio perfil y con rol `operador`. Solo un admin puede listar usuarios y cambiar roles (únicamente el campo `role`). Nadie puede borrar perfiles desde el cliente.

Revisa y adapta estas reglas a tus requisitos antes de usar datos reales.

## Flujo de datos

```text
Componente ──dispatch──▶ thunk (vehiculosSlice) ──▶ Firestore
     ▲                          │
     └────── useAppSelector ◀── reducer (lista, loading, error)
```

La sesión no está en Redux: la gestiona `AuthProvider` con `onAuthStateChanged` y expone `user`, `role`, `loading` y las acciones de acceso mediante el hook `useAuth`.

## Estructura

```text
src/
├── app/                 # store.ts y hooks tipados (useAppDispatch / useAppSelector)
├── components/          # Layout, Notice, ProtectedRoute, RoleRoute
├── context/             # auth-context, AuthProvider, useAuth, authErrors
├── features/
│   ├── ui/              # uiSlice: avisos globales
│   └── vehiculos/       # vehiculosSlice (thunks CRUD) y VehiculoForm
├── pages/               # Home, Login, Register, VehiculosPage, UsuariosPage,
│                        # AjustesPage, NoAcceso, NotFound
├── router/              # router.tsx: rutas y guards
├── types/               # vehiculo.ts
├── firebaseConfig.ts    # Inicialización de Firebase desde variables de entorno
├── App.tsx              # Monta el router
└── main.tsx             # Provider de Redux + AuthProvider
```

## Scripts

| Comando | Acción |
|---------|--------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Comprobación de tipos y build de producción |
| `npm run lint` | ESLint |
| `npm run preview` | Sirve el build generado |

## Solución de problemas

- **"Firebase no está configurado":** falta `.env.local` o alguna variable obligatoria; reinicia `npm run dev` tras crearlo.
- **`auth/operation-not-allowed`:** el proveedor de correo y contraseña no está habilitado.
- **`Missing or insufficient permissions`:** las reglas no están publicadas o tu perfil `users/{uid}` no tiene el rol esperado. Si acabas de cambiar el rol, cierra sesión y vuelve a entrar.
- **Entras en `/no-acceso` siendo admin:** comprueba que `role` es exactamente `admin` y recarga la sesión.
- **El listado de usuarios no carga:** solo los administradores pueden listar `users`.
