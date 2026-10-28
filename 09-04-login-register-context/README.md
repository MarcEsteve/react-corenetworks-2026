# Login y registro con Context

Ejemplo basado en [09-login-register-context](https://github.com/MarcEsteve/curso-react-corenetworks/tree/abddfdf47ea56db1902b81eeba963dc3f3f28307/09-login-register-context).

## Arrancar

Desde la raíz del repositorio:

```sh
cd 09-04-login-register-context
npm install
npm run dev
```

Abre la dirección que indique Vite. Si PowerShell bloquea npm, utiliza `npm.cmd`.

## Probar

1. Entra en **Iniciar sesión**. Puedes usar una cuenta del proyecto Firebase del curso.
2. Para crear una cuenta, pulsa **Cambiar a Registro** y completa nombre, email y contraseña.
3. Una vez autenticado, pulsa **Acceder al panel privado**.
4. Pulsa **Cerrar sesión**. Si intentas entrar en `/panel` sin sesión, volverás a `/login`.

## Estructura

- `context/AuthProvider.tsx`: escucha la sesión de Firebase y la comparte mediante Context.
- `context/useAuth.ts`: permite consultar el usuario y cerrar sesión.
- `components/ProtectedRoute.tsx`: comprueba la sesión antes de mostrar el panel.
- `pages/`: inicio, login/registro y panel privado.

`src/firebaseConfig.ts` usa el proyecto `dgtdb-706d2`, igual que la referencia. Necesita Email/Contraseña habilitado en Authentication y permisos para guardar el perfil en `usuarios/{uid}` de Firestore. Las cuentas se gestionan en Authentication; Firestore guarda el perfil.

Comprobaciones: `npm run build` y `npm run lint`.
