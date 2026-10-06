// Ejemplo de una asincronía con async/await para obtener un GIF aleatorio de Giphy
const getImagen = async () => {
  try {
    const apiKey = "yWdPXAvO46C6WXKmAx0Cz2jbiMWyaBzP";
    const resp = await fetch(
      `http://api.giphy.com/v1/gifs/random?api_key=${apiKey}`
    );
    // console.log(resp);
    const { data } = await resp.json();

    const { url } = data.images.original;

    const img = document.createElement("img");
    img.src = url;
    document.body.append(img);
  } catch (error) {
    // manejo del error
    console.error(error);
    // Puedes mostrar un mensaje al usuario o realizar alguna acción específica
  }
};

//Otras funciones

getImagen();
console.log("Antes de la imagen");
