# Login y registro con Context

Aplicación React con Firebase para crear cuentas, iniciar y cerrar sesión y acceder a un panel privado. Context comparte el usuario autenticado entre los componentes sin pasar props manualmente.

## Arrancar

Desde la raíz del repositorio:

```sh
cd 09-04-login-register-context
npm install
npm run dev
```

Abre la URL que indique Vite. `npm install` solo es necesario al preparar el proyecto o cambiar sus dependencias. Si PowerShell bloquea npm, utiliza `npm.cmd`.

## Probar la aplicación

1. Pulsa **Iniciar sesión** y accede con una cuenta del proyecto Firebase del curso.
2. Si necesitas una cuenta, pulsa **Cambiar a Registro** e introduce nombre, email, contraseña y su confirmación.
3. Pulsa **Acceder al panel privado** para entrar en `/panel`.
4. Pulsa **Cerrar sesión**. Si visitas `/panel` sin autenticarte, se te redirige a `/login`.

## Cómo funciona

- **Firebase Authentication** gestiona las cuentas y la sesión. Al registrarse, **Firestore** guarda el perfil en `usuarios/{uid}`.
- **AuthProvider** escucha los cambios de sesión y comparte `user`, `loading` y `logout` mediante Context.
- **useAuth** permite utilizar esos datos y acciones desde los componentes.
- **ProtectedRoute** espera a que Firebase compruebe la sesión: muestra el panel si hay usuario o redirige al login.

`main.tsx` envuelve la aplicación con `AuthProvider`; `App.tsx` define las rutas `/`, `/login` y `/panel`. Las pantallas están en `src/pages/`.

## Firebase

`src/firebaseConfig.ts` conecta con el proyecto `dgtdb-706d2`. Necesita **Email/Contraseña** habilitado en Authentication y reglas de Firestore que permitan guardar el perfil del usuario. Puedes reutilizar las cuentas creadas en el ejercicio anterior si utilizas el mismo proyecto.

La ruta protegida controla la navegación; los permisos de los datos se configuran en las reglas de Firebase.

Basado en [el ejemplo del curso](https://github.com/MarcEsteve/curso-react-corenetworks/tree/abddfdf47ea56db1902b81eeba963dc3f3f28307/09-login-register-context). Comprobaciones: `npm run build` y `npm run lint`.