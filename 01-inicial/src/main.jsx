import { heroes } from '../src/data/heroes';
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

console.log( getHeroeById(5) ); // { id: 2, name: 'Spiderman', owner: 'Marvel' }

const frutas = ["plátano", "kiwi", "sandía"];
const result = frutas.filter((textoFruta) => textoFruta.length > 6);
console.log(result); // Expected output: Array ["plátano"]