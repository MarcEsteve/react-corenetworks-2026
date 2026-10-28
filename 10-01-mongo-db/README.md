# React + Express + MongoDB local

React consulta la API de Express y muestra los usuarios guardados en MongoDB local. Usamos Compass para ver y gestionar esos datos.

## 1. MongoDB Compass

Conecta Compass a tu MongoDB local:

```text
mongodb://localhost:27017
```

Comprueba que tienes la base de datos `DGTDB`, la colección `usuarios` y documentos con los campos `username`, `name` y `role`. MongoDB local debe estar en ejecución.

## 2. Configuración inicial

En `server/index.js`, configura la conexión local y el puerto que utiliza el proxy de React:

```javascript
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/DGTDB'
const COLLECTION = process.env.MONGO_COLLECTION ?? 'usuarios'
const PORT = process.env.PORT ?? 3001
```

Si tu base de datos tiene otro nombre en Compass, sustituye `DGTDB` por ese nombre.

## 3. Arrancar Express

Desde la carpeta `10-01-mongo-db`, abre una terminal y ejecuta:

```sh
cd server
npx nodemon index.js
```

Deja esta terminal abierta. Nodemon reinicia Express cuando guardas cambios en el servidor.

Comprueba la API en el navegador: **http://localhost:3001/api/users**. Debe devolver los usuarios en formato JSON.

## 4. Arrancar React

Abre otra terminal en `10-01-mongo-db` (la carpeta que contiene `package.json`, fuera de `server`) y ejecuta:

```sh
npm run dev
```

Abre la URL que muestra Vite en la consola, normalmente **http://localhost:5173**.

React hace `fetch('/api/users')` y el proxy de Vite envía la petición a Express en el puerto `3001`. Express consulta MongoDB y devuelve los datos para la tabla.

Si modificas los datos desde Compass, recarga la página para verlos. Para detener cada servidor, pulsa `Ctrl+C` en su terminal.