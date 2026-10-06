const exito = false; // ✅ Pon esto en true o false para probar resolve o reject

const promiseA = new Promise((resolutionFunc, rejectionFunc) => {
  setTimeout(() => {
    if (exito) {
      resolutionFunc(777); // Resuelve la promesa con un valor
    } else {
      rejectionFunc("Algo salió mal"); // Rechaza la promesa con un error
    }
  }, 2000); // Espera 2 segundos
});

promiseA
  .then((val) => {
    console.log("✅ La promesa se resolvió con el valor aceptado de:", val);
  })
  .catch((err) => {
    console.error("❌ La promesa fue rechazada con error:", err);
  })
  .finally(() => {
    console.log("La promesa terminó (resuelta o rechazada)");
  });

console.log("⏳ Operación en curso...(esto es en promesas)");