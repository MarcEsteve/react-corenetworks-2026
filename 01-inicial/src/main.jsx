const apiKey = "yWdPXAvO46C6WXKmAx0Cz2jbiMWyaBzP";

const peticion = fetch(`http://api.giphy.com/v1/gifs/random?api_key=${apiKey}`);

peticion
  .then((resp) => resp.json())
  .then(({ data }) => {
    // Desestructuramos el objeto data para obtener la información del GIF ya que es "data.data"
    const { url } = data.images.original;
    //Primero creo la imagen con la url de Giphy
    const img = document.createElement("img");
    img.src = url;
    // Luego la añado al body del documento
    document.body.append(img);
    //Capturar el nombre del GIF
    const { title } = data;
    console.log("Nombre del GIF:", title);
    //Renderizamos en pantalla
    const titleElement = document.createElement("p");
    titleElement.innerText = `Nombre del GIF: ${title}`;
    document.body.append(titleElement);
  })
  .catch(console.warn);