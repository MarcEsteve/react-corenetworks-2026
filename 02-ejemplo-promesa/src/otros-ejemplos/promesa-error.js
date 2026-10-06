function obtenerEstadoTrafico(carretera) {
  return new Promise((resolve, reject) => {
    console.log("Consultando el estado del tráfico...");

    setTimeout(() => {
      if (!carretera) {
        // Simulamos un error por falta de parámetro
        reject("❌ Error: No se ha especificado ninguna carretera.");
      } else {
        // Si hay carretera, devolvemos un estado aleatorio
        const estados = ["Fluido", "Denso", "Retenciones", "Cortado por obras"];
        const estadoAleatorio = estados[Math.floor(Math.random() * estados.length)];
        resolve(`Tráfico en la ${carretera}: ${estadoAleatorio}`);
      }
    }, 2000);
  });
}

// 🚗 Caso con error (sin pasar la carretera)
obtenerEstadoTrafico()
  .then((resultado) => {
    console.log("✅ Resultado recibido:", resultado);
  })
  .catch((error) => {
    console.error("⚠️ Se ha producido un error al obtener el tráfico:");
    console.error(error);
  })
  .finally(() => {
    console.log("Consulta finalizada.");
  });
