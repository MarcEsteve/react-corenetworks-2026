import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AlertaProvider } from "./context/AlertaContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AlertaProvider>
      <App />
    </AlertaProvider>
  </React.StrictMode>
);
