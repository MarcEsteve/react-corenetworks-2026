import { describe, it, expect, vi } from "vitest";

describe("vi.fn() con valor de retorno", () => {
  it("devuelve un valor y registra la llamada", () => {
    const spy = vi.fn(() => "OK");

    const resultado = spy("mensaje");

    expect(resultado).toBe("OK");
    expect(spy).toHaveBeenCalledWith("mensaje");
    expect(spy).toHaveReturnedWith("OK");
  });
});
