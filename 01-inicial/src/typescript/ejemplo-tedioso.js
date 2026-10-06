/*
Código en JavaScript
*/
const sumar = (numero1, numero2) => {
if(typeof(numero1) !== 'number' || typeof(numero2) !== 'number') {
  return console.log('Al menos uno de los valores no es de tipo numérico');
}
  return numero1 + numero2;
}

// Pruebas
sumar(1, 2); // devuelve 3
sumar('1', '2'); // muestra mensaje de error: Al menos uno de los valores no es de tipo numérico