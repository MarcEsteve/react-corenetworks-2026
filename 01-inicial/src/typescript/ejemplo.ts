/*
Código en TypeScript
*/
const sumarlos = (numero1: number, numero2: number) => {
    return numero1 + numero2;
}
// devuelve 3
sumarlos(1, 2);
// error en TypeScript porque la función sumarlos espera dos variables de tipo numérico
// sumarlos('1', '2')