import { describe, it, expect } from "vitest";
import { sumar } from "./sumar";

describe("Función sumar", () => {
  it("Debería sumar correctamente dos números", () => {
    expect(sumar(2, 3)).toBe(5);
  });

  it("Debería devolver número negativo, si ambos son negativos", () => {
    expect(sumar(-4, -6)).toBe(-10);
  });
  
  it("Debería devolver el mismo número si se suma con cero", () => {
    expect(sumar(7, 0)).toBe(7);
  });
});
