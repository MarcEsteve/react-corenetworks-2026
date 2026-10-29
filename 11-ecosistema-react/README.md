# Ecosistema React + Material UI

Proyecto Vite con React, TypeScript y Material UI.

## Desarrollo

```bash
npm install
npm run dev
```

## Verificación

```bash
npm run lint
npm run build
npm run preview
```

## Material UI

- `src/main.tsx`: fuentes Roboto 300, 400, 500 y 700, `ThemeProvider` y `CssBaseline`.
- `src/theme.ts`: tema compartido con paleta, tipografía y configuración de componentes.
- `src/App.tsx`: página responsive con componentes MUI, estilos `sx` y un contador interactivo.

Para personalizar la apariencia global, edita `src/theme.ts`. Para estilos de un componente, utiliza `sx` con los valores del tema y los breakpoints `xs`, `sm` y `md`.

React 19 es compatible con Material UI; no requiere el override de `react-is` indicado para React 18 o anterior.

Documentación oficial: https://mui.com/material-ui/getting-started/installation/
