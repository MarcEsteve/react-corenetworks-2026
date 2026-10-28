# Login y roles

Adaptación de [09-login-rol-redux](https://github.com/MarcEsteve/curso-react-corenetworks/tree/abddfdf47ea56db1902b81eeba963dc3f3f28307/09-login-rol-redux). Incluye registro, login, cierre de sesión y acceso por rol con Firebase.

## Arrancar

Desde la raíz del repositorio:

```sh
cd 09-05-login-rol-redux
npm install
npm run dev
```

Abre la URL de Vite. Si PowerShell bloquea npm, usa `npm.cmd`.

## Probar

- **Inicio**: público.
- **Panel** (`/panel`): requiere sesión.
- **Ajustes** (`/panel/ajustes`): requiere el rol `admin`. Los demás usuarios van a `/no-acceso`.
- **Login**: permite entrar o cambiar al registro. Las nuevas cuentas guardan `role: "user"`.

Para probar como administrador, cambia el campo `role` a `"admin"` en el documento `usuarios/{uid}` desde la consola de Firestore. La aplicación escucha los cambios del perfil.

## Cómo funciona

`AuthProvider` escucha la sesión y el perfil de Firestore; `useAuth` los comparte con los componentes. `ProtectedRoute` comprueba la sesión y `RoleRoute` comprueba el rol.

Aunque el ejemplo se llama «redux», el commit de referencia utiliza **Context** para la sesión. Se mantienen las dependencias Redux de la referencia, sin añadir un flujo distinto.

`src/firebaseConfig.ts` conecta con `dgtdb-706d2`. Necesita Email/Contraseña habilitado y permisos para leer y crear el perfil propio en `usuarios/{uid}`. Las reglas de Firestore deben impedir que un usuario se asigne el rol de administrador; las rutas solo controlan la navegación.

Comprobaciones: `npm run build` y `npm run lint`.
