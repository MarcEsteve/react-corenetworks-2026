
// Simulamos una función que consulta el estado del tráfico en una carretera
function obtenerEstadoTrafico(carretera) {
  return new Promise((resolve, reject) => {
    console.log(`Consultando el estado del tráfico en la ${carretera}...`);

    setTimeout(() => {
      // Simulamos diferentes resultados posibles
      const estados = ["Fluido", "Denso", "Retenciones", "Cortado por obras"];
      const estadoAleatorio = estados[Math.floor(Math.random() * estados.length)];

      if (carretera) {
        resolve(`Tráfico en la ${carretera}: ${estadoAleatorio}`);
      } else {
        reject("No se ha especificado ninguna carretera");
      }
    }, 3000); // Simula un retardo de 3 segundos (como si consultara una API)
  });
}

// Ejemplo de uso en la interfaz
const carreteraInput = "AP-7";

obtenerEstadoTrafico(carreteraInput)
  .then((resultado) => {
    console.log("✅ Resultado recibido:");
    console.log(resultado);
    // Aquí podríamos actualizar la interfaz con el resultado:
    // document.getElementById("resultado").innerText = resultado;
  })
  .catch((error) => {
    console.error("❌ Error al obtener el estado del tráfico:", error);
    // document.getElementById("resultado").innerText = error;
  })
  .finally(() => {
    console.log("Consulta completada.");
  });
