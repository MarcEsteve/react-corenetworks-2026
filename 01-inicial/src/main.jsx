import heroes  from '../src/data/heroes';
//Exportación cuando no es default
// import {heroes}  from '../src/data/heroes';
console.log( heroes ); 

const getHeroeById = (id) =>{
  return heroes.find((heroe) => {
    if (heroe.id === id) {
      return true;
      
    } else {
      return false;
    }
  });
}

console.log( getHeroeById(2) ); // { id: 2, name: 'Spiderman', owner: 'Marvel' }

const frutas = ["plátano", "kiwi", "sandía", "manzana"];
const result = frutas.filter((textoFruta) => textoFruta.length > 6);
console.log(result); // Expected output: Array ["plátano"]

const getHeroesByOwner = (propietario) =>
  heroes.filter((heroe) => heroe.owner === propietario);

console.log( getHeroesByOwner('Marvel') ); 
// [{ id: 2, name: 'Spiderman', owner: 'Marvel' }, { id: 5, name: 'Wolverine', owner: 'Marvel' }]
//Hasta aqui exports e imports