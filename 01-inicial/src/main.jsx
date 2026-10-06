// Creo la promesa
const promesa = new Promise((resolve, reject) => {
  console.log("Inicio de la promesa");
  setTimeout(() => {
    resolve();
  },2000)
});

// Consumo la promesa
promesa.then( () => {
  console.log("Se ejecutó la promesa (2000ms)");
});