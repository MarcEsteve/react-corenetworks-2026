import { describe, it, expect } from "vitest";
import { estadoVelocidad } from "./velocidad";

describe("estadoVelocidad", () => {
  it("Marca 'Multa' cuando supera el límite", () => {
    expect(estadoVelocidad(120, 100)).toBe("Multa");
  });
  // Si no añadimos el caso 'Correcto', Branches quedará al 50%.
  it("Marca 'Correcto' cuando no supera el límite", () => {
    expect(estadoVelocidad(90, 100)).toBe("Correcto");
  });
});
