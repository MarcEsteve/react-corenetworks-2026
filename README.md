# react-corenetworks-2026

## 📘 Curso de React - CoreNetworks 2026

Bienvenido/a al repositorio oficial del **Curso de React** impartido por CoreNetworks. Aquí encontrarás todo el material, ejercicios y proyectos prácticos que iremos desarrollando a lo largo del curso.

### 🎯 ¿Qué aprenderás?

- Fundamentos de React: componentes, props, estado y eventos
- Hooks (useState, useEffect, useContext, useRef, entre otros)
- Manejo de formularios y validaciones
- Enrutamiento con React Router
- Consumo de APIs y gestión de datos asíncronos
- Gestión de estado global (Context API / librerías externas)
- Buenas prácticas, estructura de proyectos y despliegue

### 🛠️ Requisitos previos

- Conocimientos básicos de HTML, CSS y JavaScript (ES6+)
- Node.js y npm (o yarn/pnpm) instalados
- Un editor de código (recomendado: VS Code)

### 🚀 Cómo usar este repositorio

Cada módulo o clase se organizará en su propia carpeta con el código de ejemplo y ejercicios correspondientes. Clona el repositorio y sigue las instrucciones de cada sesión:

```bash
git clone https://github.com/MarcEsteve/react-corenetworks-2026.git
cd react-corenetworks-2026
```

### 📅 Proyectos y ejercicios

| Carpeta | Resumen |
| --- | --- |
| [00-test](./00-test/) | Plantilla inicial de React con Vite, sin lógica de aplicación. |
| [01-inicial](./01-inicial/) | Fundamentos de JavaScript y TypeScript: funciones, desestructuración, módulos, promesas y consumo de APIs. |
| [02-ejemplo-promesa](./02-ejemplo-promesa/) | Consulta simulada de tráfico para practicar promesas, errores y `finally`. |
| [03-react-ts](./03-react-ts/) | Componentes reutilizables y props tipadas con React y TypeScript. |
| [03-hook-trafico](./03-hook-trafico/) | Componentes de tráfico, renderizado condicional y activación de alertas con `useState`. |
| [04-testing-jest](./04-testing-jest/) | Introducción a las pruebas unitarias con Jest mediante una función de suma. |
| [04-testing-vitest](./04-testing-vitest/) | Pruebas de funciones y alertas de velocidad con Vitest, mocks y espías. |
| [05-react-router](./05-react-router/) | Listado y detalle de vehículos con rutas anidadas, parámetros, filtros y página 404. |
| [05-react-router-dgt](./05-react-router-dgt/) | Navegación DGT con loaders de React Router, datos JSON y manejo de errores. |
| [06-context-api](./06-context-api/) | Estado de alertas compartido entre componentes mediante Context API. |
| [06-redux-toolkit](./06-redux-toolkit/) | Gestión global de alertas y contadores de acciones con Redux Toolkit. |
| [07-auth-routes-inicial](./07-auth-routes-inicial/) | Login simulado, sesión en `localStorage` y rutas protegidas con Context. |
| [07-auth-routes-json](./07-auth-routes-json/) | Login de demostración con usuarios de un JSON, panel anidado y acceso por rol. |
| [08-distintivo-dgt](./08-distintivo-dgt/) | Consulta de distintivos ambientales por matrícula sobre datos locales de ejemplo. |
| [09-01-crud-rtdb](./09-01-crud-rtdb/) | CRUD de usuarios en Firebase Realtime Database mediante su API REST. |
| [09-02-crud-vehiculos](./09-02-crud-vehiculos/) | CRUD de vehículos con Cloud Firestore y operaciones asíncronas en Redux Toolkit. |
| [09-03-firebase-authentication](./09-03-firebase-authentication/) | Formularios de registro y login con Firebase Authentication y perfiles en Firestore. |
| [09-04-login-register-context](./09-04-login-register-context/) | Sesión de Firebase compartida con Context y acceso a un panel privado. |
| [09-05-login-rol-redux](./09-05-login-rol-redux/) | Autenticación Firebase y rutas por rol; la sesión utiliza Context pese al nombre de la carpeta. |
| [09-06-completo](./09-06-completo/) | Aplicación integrada: CRUD de vehículos, autenticación, administración por roles, Redux Toolkit y Firestore. |
| [10-01-mongo-db](./10-01-mongo-db/) | Consulta y visualización de usuarios de MongoDB local mediante una API Express. |
| [10-02-mern-fullstack](./10-02-mern-fullstack/) | CRUD de vehículos con búsqueda, frontend React y API Express con Mongoose y MongoDB Atlas. |

Cada carpeta es independiente. Para los proyectos con Vite, ejecuta `npm install` y `npm run dev` dentro de su carpeta. Los ejemplos con Firebase o MongoDB requieren la configuración indicada en su README; los de MongoDB también necesitan arrancar el backend.

---

¡Manos a la obra y a disfrutar aprendiendo React! 🚀
