# 🚀 Ecosistema React: MUI, SweetAlert2 y JWT

Proyecto didáctico con React 19, TypeScript y Vite. Incluye una interfaz responsive con Material UI, ejemplos de SweetAlert2 y autenticación JWT con Express, sin base de datos ni operaciones CRUD.

## Puesta en marcha

Desde `11-ecosistema-react`:

```bash
npm install
```

Necesitas Node.js 20.19+ o 22.12+. Se ha creado un `.env` local con una clave aleatoria. En otra copia del repositorio, genera uno con:

```bash
node -e "const fs=require('node:fs'); if(fs.existsSync('.env')) throw new Error('.env ya existe'); fs.writeFileSync('.env', 'JWT_SECRET='+require('node:crypto').randomBytes(48).toString('hex')+'\nPORT=4000\n')"
```

Consulta `.env.example` para ver las variables. `JWT_SECRET` debe contener al menos 32 caracteres, permanecer solo en el servidor y no llevar el prefijo `VITE_`. Una variable de entorno separa el secreto del código; no lo cifra.

Abre dos terminales en esta carpeta:

```bash
# Terminal 1: API en http://localhost:4000
npm run server:dev
```

```bash
# Terminal 2: abre la URL que indique Vite
npm run dev
```

Vite redirige `/api` al backend mediante su proxy. React usa rutas relativas, sin necesitar CORS para esta configuración. Si cambias `PORT`, cambia también el destino en `vite.config.ts`.

## 🔐 Probar el login

En la sección «Acceso al área DGT», utiliza:

- Email: `admin@dgt.es`
- Contraseña: `1234`

Son credenciales públicas de demostración, sin relación con un servicio real de la DGT.

1. Inicia sesión: Express valida las credenciales y devuelve un token firmado con HS256 que caduca en una hora.
2. React consulta el perfil protegido y guarda el token en `localStorage` con la clave `token`.
3. Pulsa «Consultar perfil protegido» para enviar otra petición con `Authorization: Bearer TOKEN`.
4. Recarga la página para recuperar y verificar la sesión guardada con el backend.
5. Pulsa «Cerrar sesión» para retirar el token del navegador. Al caducar, deberás iniciar sesión de nuevo.

Una contraseña errónea muestra un error. Si Express no está iniciado, el formulario informa del fallo de conexión. Una respuesta 401/403 al consultar el perfil elimina la sesión local.

## 🚀 Resumen visual

```text
Usuario introduce email y contraseña
                 │ POST /api/login
                 ▼
Express valida credenciales
                 │ jwt.sign(..., JWT_SECRET, { expiresIn: '1h' })
                 ▼
React recibe y guarda el token
                 │ GET /api/perfil
                 │ Authorization: Bearer TOKEN
                 ▼
Middleware verifica firma, algoritmo y caducidad
                 ├── Válido → acceso permitido 🔓
                 └── Ausente / inválido / expirado → acceso rechazado 🔒
```

## API

| Método | Ruta | Acceso | Resultado |
| --- | --- | --- | --- |
| POST | `/api/login` | Público | `{ token }` al recibir `{ email, password }` válidos |
| GET | `/api/perfil` | Bearer token | `{ email, role, expiresAt }` |

`expiresAt` es una fecha Unix en milisegundos. Respuestas: 400 para campos obligatorios o JSON inválido; 403 si falta el token; 401 para credenciales, formato Bearer o token inválidos/expirados. Los errores devuelven `{ error }`.

## Estructura

| Archivo | Responsabilidad |
| --- | --- |
| `server/index.js` | Carga `.env` y arranca Express |
| `server/app.js` | Login y ruta protegida de perfil |
| `server/middleware/verificarToken.js` | Verificación JWT y asignación de `req.user` |
| `server/auth.test.js` | Pruebas HTTP de autenticación |
| `src/api/auth.ts` | Fetch de login y perfil con Bearer token |
| `src/components/Login.tsx` | Formulario, sesión, caducidad y logout |
| `src/main.tsx` | Roboto 300/400/500/700, ThemeProvider y CssBaseline |
| `src/theme.ts` | Tema MUI centralizado |
| `src/components/SweetAlertExamples.tsx` | Alerta de éxito y campo de email |
| `src/components/DeleteButton.tsx` | Confirmación de eliminación simulada |

Los estilos de interfaz utilizan `sx` y el sistema responsive de MUI. Las alertas usan los colores del tema. El ejemplo de eliminación no cambia datos.

## 🧠 Alcance y buenas prácticas

- Un JWT está firmado, no cifrado: no incluyas contraseñas ni secretos en su contenido.
- `localStorage` se usa aquí para aprendizaje en un entorno controlado; cualquier JavaScript del mismo origen puede acceder a él y un XSS puede robarlo. `sessionStorage` también es accesible a JavaScript.
- Para producción, diseña el almacenamiento y la sesión según la aplicación. Las cookies necesitan protecciones como `HttpOnly`, `Secure` y `SameSite`, junto con protección CSRF cuando corresponda. Usa HTTPS.
- Sustituye las credenciales fijas por usuarios con contraseñas hasheadas y añade límites de intentos de login.
- El servidor verifica el JWT: ocultar elementos en React o decodificar el token no protege una ruta.
- Cerrar sesión en este ejemplo elimina la copia local; no revoca un token ya emitido, que seguirá siendo válido hasta su caducidad.
- No se implementan refresh tokens. El siguiente paso para una sesión renovable sería un flujo separado con expiración, rotación y revocación de refresh tokens; no basta con volver a firmar un access token expirado.
- El backend escucha en loopback para desarrollo. Un despliegue requiere configurar la exposición del servidor y un proxy que sirva `/api`; el proxy de desarrollo de Vite no forma parte de `dist`.

## Verificación

```bash
npm run test:api
npm run lint
npm run build
```

Las pruebas cubren credenciales válidas e inválidas, campos vacíos, token ausente, firma incorrecta, token expirado, cabecera incorrecta y JSON malformado. `npm run preview` permite revisar el build local con Express iniciado. `npm run server` arranca la API sin watch.

## Documentación oficial

- [Material UI: instalación](https://mui.com/material-ui/getting-started/installation/)
- [SweetAlert2](https://sweetalert2.github.io/)
- [jsonwebtoken: firma y verificación](https://github.com/auth0/node-jsonwebtoken)
- [Vite 6: proxy del servidor](https://v6.vite.dev/config/server-options#server-proxy)
