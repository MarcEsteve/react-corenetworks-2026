import { getHeroeById } from "../src/basico/05-import-export";


const promesa = new Promise((resolve, reject) => {
  setTimeout(() => {
    const p1 = getHeroeById(2);
    // resolve(p1);
    reject( 'No se pudo encontrar el héroe' );
  }, 2000);
});

promesa
  .then((heroe) => {
    console.log("heroe", heroe);
  })
  .catch((err) => console.warn(err));
  
console.log("Inicio de la búsqueda de héroe...");