import { afterEach, describe, expect, it, vi } from "vitest";
import * as alertas from "./alertas";
import { verificarVelocidad } from "./controlVelocidad";

describe("verificarVelocidad()", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("llama a enviarAlerta si se supera el límite", () => {
    const spy = vi.spyOn(alertas, "enviarAlerta");

    verificarVelocidad(120, 100);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("Exceso de velocidad detectado");
  });

  it("no llama a enviarAlerta si no se supera el límite", () => {
    const spy = vi.spyOn(alertas, "enviarAlerta");

    verificarVelocidad(90, 100);

    expect(spy).not.toHaveBeenCalled();
  });
});
