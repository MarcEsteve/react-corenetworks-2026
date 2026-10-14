# Pruebas con Vitest: espiar funciones con `vi.spyOn`

Este ejemplo comprueba que el control de velocidad avisa cuando un vehículo
supera el límite. Para verificar esa interacción usamos un *spy*: una
herramienta de Vitest que observa las llamadas a una función sin tener que
reescribir el código que la utiliza.

## 1. Función que envía la alerta

En [`src/utils/alertas.ts`](./src/utils/alertas.ts) definimos y exportamos la
función que queremos observar:

```ts
export function enviarAlerta(mensaje: string) {
  console.log("🚨 ALERTA DGT:", mensaje);
}
```

## 2. Función que controla la velocidad

En [`src/utils/controlVelocidad.ts`](./src/utils/controlVelocidad.ts)
importamos `enviarAlerta` y la llamamos solo si la velocidad supera el límite:

```ts
import { enviarAlerta } from "./alertas";

export function verificarVelocidad(velocidad: number, limite: number) {
  if (velocidad > limite) {
    enviarAlerta("Exceso de velocidad detectado");
  }
}
```

## 3. El concepto de spy

Un *spy* (espía) es una función "observadora": registra cuántas veces se
llamó, con qué argumentos y qué devolvió. En React se usa para comprobar
interacciones sin depender de su efecto real, por ejemplo que un `onClick` o
un callback recibido por props se ejecuta al interactuar con un componente.

En [`src/utils/controlVelocidad.test.ts`](./src/utils/controlVelocidad.test.ts)
usamos `vi.spyOn(alertas, "enviarAlerta")`: espía la función real (que sigue
ejecutándose) y permite comprobar con `toHaveBeenCalled`,
`toHaveBeenCalledTimes` y `toHaveBeenCalledWith` que se avisó con el mensaje
esperado. `spy.mockRestore()` devuelve la función a su estado original.

### 3.1 Espía vacío con `vi.fn()`

[`src/utils/spyFn.test.ts`](./src/utils/spyFn.test.ts): `vi.fn()` crea un
espía vacío, sin implementación, ideal para simular un callback. Se pasa a
`forEach` y después se verifica el número de llamadas
(`toHaveBeenCalledTimes(3)`) y los argumentos (`toHaveBeenCalledWith("rojo")`).

### 3.2 Espía con valor de retorno

[`src/utils/spyRetorno.test.ts`](./src/utils/spyRetorno.test.ts):
`vi.fn(() => "OK")` crea un espía con una implementación que devuelve un
valor. Además de comprobar los argumentos con `toHaveBeenCalledWith`, se
verifica lo devuelto con `toHaveReturnedWith("OK")`.

## 4. Ejecutar las pruebas

Desde esta carpeta (`04-testing-vitest`), ejecuta:

```bash
npm test -- --run
```

Para iniciar Vitest en modo interactivo y volver a ejecutar las pruebas cuando
cambien los archivos:

```bash
npm test
```
