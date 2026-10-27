# 🚗 DGT — Gestión de Vehículos (CRUD con React, Redux Toolkit y Firebase Firestore)

Ejemplo práctico del módulo de React Intermedio/Avanzado que implementa un **CRUD completo** (Create, Read, Update, Delete) conectado a una base de datos en la nube **Cloud Firestore (Firebase)** y gestionado mediante un estado global con **Redux Toolkit** y **TypeScript**.

---

## 📋 Tabla de Contenidos

1. [Características de la Aplicación](#-características-de-la-aplicación)
2. [Stack Tecnológico](#-stack-tecnológico)
3. [Configuración de Firebase y API Key](#-configuración-de-firebase-y-api-key)
4. [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
5. [Flujo del CRUD](#-flujo-del-crud)
6. [Instalación y Puesta en Marcha](#-instalación-y-puesta-en-marcha)
7. [Buenas Prácticas](#-buenas-prácticas)

---

## 🚀 Características de la Aplicación

- **Alta de vehículos (Create)**: Formulario reactivo para registrar nuevos vehículos con validación de tipos.
- **Listado en tiempo real (Read)**: Carga y visualización dinámica de la colección de vehículos desde Firestore con indicador de carga.
- **Actualización (Update)**: Modo de edición en línea (*inline editing*) en cada tarjeta de vehículo para modificar datos y sincronizarlos con la base de datos.
- **Eliminación (Delete)**: Borrado instantáneo de documentos tanto en Firestore como en el estado local de Redux.
- **Datos gestionados por vehículo**:
  - `matricula` (string)
  - `marca` (string)
  - `modelo` (string)
  - `anioMatriculacion` (number)
  - `combustible` (Gasolina, Diésel, Eléctrico, Híbrido)
  - `itvVigente` (boolean)
  - `seguroVigente` (boolean)

---

## 🛠️ Stack Tecnológico

- **React 19**: Biblioteca para construir interfaces declarativas por componentes.
- **TypeScript**: Tipado estático robusto (`Vehiculo`, `RootState`, `AppDispatch`).
- **Redux Toolkit (`@reduxjs/toolkit` y `react-redux`)**:
  - `createSlice`: Reducers y acciones centralizadas.
  - `createAsyncThunk`: Gestión de operaciones asíncronas con ciclo de vida (`pending`, `fulfilled`, `rejected`).
  - Typed hooks (`useDispatch`, `useSelector`).
- **Firebase Firestore (`firebase/firestore`)**: Base de datos NoSQL en tiempo real basada en colecciones y documentos.
- **Vite 6**: Empaquetador y entorno de desarrollo rápido.

---

## 🔑 Configuración de Firebase y API Key

La conexión con Firebase se inicializa en el archivo [`src/firebaseConfig.ts`](./src/firebaseConfig.ts):

```typescript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### ℹ️ ¿Cómo funciona la API Key en Firebase?

1. **Propósito**: La `apiKey` de Firebase identifica a tu aplicación cliente ante los servicios de Google Cloud. No es un secreto de servidor clásico, sino un identificador público de proyecto cliente.
2. **Seguridad**: La seguridad de los datos **no reside en ocultar la API Key**, sino en las **Reglas de Seguridad de Firestore (Security Rules)** configuradas en la consola de Firebase:
   ```javascript
   // Ejemplo de reglas en Firebase Console -> Firestore Database -> Rules
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /vehiculos/{vehiculoId} {
         allow read, write: if true; // ⚠️ Solo para entornos de desarrollo/pruebas
       }
     }
   }
   ```
3. **Variables de entorno (Recomendado en Producción)**:
   Para proyectos en producción o repositorios públicos, se recomienda extraer las credenciales a un archivo `.env.local`:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=dgtdb-706d2.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=dgtdb-706d2
   ```
   Y consumirlas en el código con `import.meta.env.VITE_FIREBASE_API_KEY`.

---

## 📂 Arquitectura del Proyecto

```text
09-crud-vehiculos/
├── index.html
├── package.json
├── vite.config.ts
├── src/
│   ├── main.tsx                    # Punto de entrada; envuelve <App /> en <Provider store={store}>
│   ├── App.tsx                     # Layout principal que monta Formulario y Lista
│   ├── firebaseConfig.ts           # Inicialización de Firebase App y exportación de `db` (Firestore)
│   ├── app/
│   │   ├── index.ts                # configureStore, RootState, AppDispatch
│   │   └── store.ts                # Re-export de store y tipados, hooks useAppDispatch y useAppSelector
│   └── features/
│       ├── alerta/
│       │   └── alertaSlice.ts      # Slice de ejemplo adicional
│       └── vehiculos/
│           ├── vehiculosSlice.ts   # Thunks asíncronos de Firestore y reducers del CRUD
│           ├── VehiculoForm.tsx    # Formulario para añadir vehículos (Create)
│           └── VehiculosList.tsx   # Listado con botones de Eliminar (Delete) y Actualizar (Update)
```

---

## 🔄 Flujo del CRUD

El ciclo de vida de los datos combina **Redux Toolkit Thunks** con la API modular de **Firebase Firestore**:

| Operación | Método UI | Thunk en `vehiculosSlice.ts` | Función Firebase | Efecto en Redux State |
| :--- | :--- | :--- | :--- | :--- |
| **Create** | `VehiculoForm` | `addVehiculo(nuevoVehiculo)` | `addDoc(collection(db, "vehiculos"), data)` | `state.lista.push(payload)` |
| **Read** | `VehiculosList` | `fetchVehiculos()` | `getDocs(collection(db, "vehiculos"))` | `state.lista = payload` |
| **Update** | `VehiculosList` | `updateVehiculo(vehiculoEditado)` | `updateDoc(doc(db, "vehiculos", id), data)` | `state.lista[i] = payload` |
| **Delete** | `VehiculosList` | `deleteVehiculo(id)` | `deleteDoc(doc(db, "vehiculos", id))` | `state.lista.filter(...)` |

### Implementación en Redux (`vehiculosSlice.ts`):

```typescript
// CREATE
export const addVehiculo = createAsyncThunk("vehiculos/add", async (vehiculo: Vehiculo) => {
  const docRef = await addDoc(collection(db, "vehiculos"), vehiculo);
  return { id: docRef.id, ...vehiculo };
});

// READ
export const fetchVehiculos = createAsyncThunk("vehiculos/fetch", async () => {
  const query = await getDocs(collection(db, "vehiculos"));
  return query.docs.map((d) => ({ id: d.id, ...d.data() })) as Vehiculo[];
});

// UPDATE
export const updateVehiculo = createAsyncThunk(
  "vehiculos/update",
  async ({ id, ...data }: Vehiculo) => {
    const ref = doc(db, "vehiculos", id!);
    await updateDoc(ref, data);
    return { id, ...data };
  }
);

// DELETE
export const deleteVehiculo = createAsyncThunk("vehiculos/delete", async (id: string) => {
  await deleteDoc(doc(db, "vehiculos", id));
  return id;
});
```

---

## 💻 Instalación y Puesta en Marcha

1. Entrar en el directorio del ejercicio:
   ```bash
   cd 09-02-crud-vehiculos
   ```

2. Instalar dependencias del proyecto:
   ```bash
   npm install
   ```

   > **Instalación de dependencias clave (si configuras el proyecto desde cero):**
   > - **Firebase** (servicios en la nube y base de datos Firestore):
   >   ```bash
   >   npm i firebase
   >   ```
   > - **Redux Toolkit y React Redux** (para la gestión del contexto y estado global):
   >   ```bash
   >   npm i @reduxjs/toolkit react-redux
   >   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Abre la URL proporcionada por Vite (habitualmente `http://localhost:5173/`).

4. Comprobar la compilación y tipado:
   ```bash
   npm run build
   ```

5. Ejecutar el linter:
   ```bash
   npm run lint
   ```

---

## 💡 Buenas Prácticas Aplicadas

- **Envoltorio en Provider**: `<App />` se envuelve en `<Provider store={store}>` en `main.tsx` para garantizar disponibilidad del contexto de Redux a todos los componentes hijos.
- **Tipado completo en TypeScript**: Exportación explícita de `RootState` y `AppDispatch` para evitar errores de compilación (`TS2724`, `TS2459`).
- **Separación de responsabilidades**: La capa de comunicación con la base de datos se mantiene dentro de los thunks de Redux en lugar de ejecutarse directamente en los componentes visuales.
