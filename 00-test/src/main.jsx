

// Una función que retorna un array con información
const retornaSpideyInfo = () => {
    return ['Spidey', 2002];
}

// Desestructuración del array retornado
const [ alias, anyAparicion ] = retornaSpideyInfo();
console.log(alias, anyAparicion); // Spidey 2002
