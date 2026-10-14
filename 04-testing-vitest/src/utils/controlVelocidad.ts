import { enviarAlerta } from "./alertas";

export function verificarVelocidad(velocidad: number, limite: number) {
  if (velocidad > limite) {
    enviarAlerta("Exceso de velocidad detectado");
  }
}
