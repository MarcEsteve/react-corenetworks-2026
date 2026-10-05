// Simulación de un hook* tipo useState (como en React)
const useSpiderState = (valor) => {
    return [ valor, () => { console.log(`Lanzando telaraña desde ${valor}`) } ];
}
//Funcion equivalente
function useSpiderStateFunction(valor) {
    return [ valor, () => { console.log(`Lanzando telaraña desde ${valor}`) } ];
}

//Funcion de flecha simplificada
const useSpiderStateSimplificada = valor => [ valor, () => { console.log(`Lanzando telaraña desde ${valor}`) } ];

//Un hook* en React es una función que permite usar el "estado" y otras características de React sin escribir una clase.
// *Nota: Aunque aquí no estamos en un entorno de React, usamos el término "hook" para ilustrar el concepto de estado y funciones asociadas.
// "Estado" en React se refiere a la capacidad de un componente para mantener y gestionar datos que pueden cambiar con el tiempo, permitiendo que la interfaz de usuario se actualice automáticamente cuando esos datos cambian.

const arr = useSpiderState('Peter Parker');
console.log(arr);
arr[0]; // Peter Parker
arr[1](); // Lanzando telaraña desde Peter Parker