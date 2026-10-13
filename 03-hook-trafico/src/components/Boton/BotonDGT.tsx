import { useState } from "react";
import styles from "./BotonDGT.module.css";

export default function BotonDGT() {
  const [activo, setActivo] = useState(true);

  return (
    <button
      className={`${styles.boton} ${activo ? styles.verde : styles.rojo}`}
      onClick={() => setActivo(!activo)}
    >
      {activo ? "🟢 Acceso permitido" : "🔴 Tramo cortado"}
    </button>
  );
}