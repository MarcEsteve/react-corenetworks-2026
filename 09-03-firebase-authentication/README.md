# Firebase Authentication y Firestore

Adaptación del ejercicio `09-firestore-auth` del repositorio de MarcEsteve, commit `abddfdf47ea56db1902b81eeba963dc3f3f28307`:
https://github.com/MarcEsteve/curso-react-corenetworks/tree/abddfdf47ea56db1902b81eeba963dc3f3f28307/09-firestore-auth

## Ejecutar

```sh
npm install
npm run dev
```

En PowerShell, si la política de scripts impide ejecutar npm, utiliza `npm.cmd install` y `npm.cmd run dev`.

## Aplicación

`src/App.tsx` muestra `AuthAdvanced`, igual que la referencia. Permite registrarse con nombre, email y contraseña, confirmar la contraseña e iniciar sesión. El registro actualiza el nombre en Authentication y crea `usuarios/{uid}` en Firestore con `uid`, `nombre`, `email` y `createdAt`.

Se conservan los ejemplos `FormularioSimple`, `FormularioValidado`, `AuthDemo`, `AuthSimple` y `FirestoreDemo`. Puedes cambiar el componente mostrado desde `App.tsx`. La lista de Firestore es un ejemplo independiente y necesita permisos adicionales de lectura de la colección.

## Firebase

`src/firebaseConfig.ts` utiliza el mismo proyecto `dgtdb-706d2` que la referencia y que `09-02-crud-vehiculos`. Para usar otro proyecto, sustituye su configuración web.

En la consola de Firebase:

1. Habilita Authentication → Método de inicio de sesión → Correo electrónico/contraseña.
2. Crea la base de datos Cloud Firestore, si todavía no existe.
3. Para el formulario avanzado, permite que cada usuario acceda a su propio documento. Integra esta regla con las reglas existentes del proyecto (sin reemplazar las de los otros ejercicios):

```text
match /usuarios/{uid} {
  allow read, write: if request.auth != null && request.auth.uid == uid;
}
```

Si el registro indica que la cuenta se creó pero el perfil no se guardó, comprueba Firestore. La cuenta ya existe en Authentication; puedes iniciar sesión con ella, pero ese inicio de sesión no vuelve a crear el documento pendiente.

## Comprobaciones

```sh
npm run build
npm run lint
```