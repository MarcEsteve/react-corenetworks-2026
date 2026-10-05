// Template Strings

const nombre   = 'Marc';
const apellido = 'Esteve';

// const nombreCompleto = nombre + ' ' + apellido;
const nombreCompleto = `${nombre} ${apellido}`;

//  {} llaves, () parentesis, [] corchetes

console.log(nombreCompleto);

function getSaludo(nombre) {
    return 'Hola ' + nombre;
}

console.log( `Este es un texto: ${ getSaludo( nombre ) } `);
// console.log( `Este es un texto: ${ getSaludo( nombreCompleto ) } `);

