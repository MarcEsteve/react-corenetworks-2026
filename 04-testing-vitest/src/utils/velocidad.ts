export function estadoVelocidad(v: number, limite: number) {
  if (v > limite) return "Multa";
  return "Correcto";
}
