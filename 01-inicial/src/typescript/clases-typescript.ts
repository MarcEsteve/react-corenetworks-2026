// Clases en TypeScript

class Jugador {
  //Atributos
  public nombre: string; // public no es obligatorio porque es el modificador por defecto
  apellidos: string; // es public también
  private goles: number;
  // Constructor
  constructor(name: string, surname: string) {
    this.nombre = name;
    this.apellidos = surname;
    this.goles = 0;
  }
  // Métodos (getters y setters)
  setGoles(goles: number): void {
    this.goles = goles;
  }
  getGoles(): number {
    return this.goles;
  }
}

let jugador1 = new Jugador("Lionel", "Messi");

console.log(jugador1.getGoles()); //0
jugador1.setGoles(5);
console.log(jugador1.getGoles()); //5

// Clases con constructor breve (si declaramos los parámetros del constructor con
// modificador de acceso se crean las propiedades con el mismo nombre)

class Player {
  constructor(
    public name: string,
    public surname: string,
    private goals: number,
  ) {}

  // setter y getters...

  getGoles(): number {
    return this.goals;
  }
}

let jugador2 = new Player("Lionel", "Messi", 3);
console.log(jugador2.getGoles()); //3

// Interfaces (como tipado estructural)

interface EstadoBoton {
  hidden: boolean;
  disabled: boolean;
  waiting: boolean;
  backgroundColor?: string; // Se pueden declarar como opcionales
  fontSize?: number; // Se pueden declarar como opcionales
  color?: string; // Se pueden declarar como opcionales
}

let estadoBotonEnvio: EstadoBoton = {
  hidden: false,
  disabled: true,
  waiting: false,
  backgroundColor: "green",
  fontSize: 20,
  color: "white",

  //backgroundColor: 'green' Al ser opcional si no se incluye no arroja error
};

// Interfaces como implementaciones obligatorias para clases

interface DatosMaestros {
  razonSocial: string;
  cif: string;

  getCif(): string;
  setCif(cif: string): void;

  getRazonSocial(): string;
  setRazonSocial(razonSocial: string): void;
}

class Proveedor implements DatosMaestros {
  // razonSocial: string;
  // cif: string;

  // constructor(razonSocialIn: string, cifIn: string) {
  //     this.razonSocial = razonSocialIn;
  //     this. = cifIn;
  // }

  //Contructor simplificado
  constructor(
    public razonSocial: string,
    public cif: string,
  ) {}

  //Getters y setters de las propiedades privadas
  getCif(): string {
    return this.cif;
  }
  setCif(cif: string): void {
    this.cif = cif;
  }
  getRazonSocial(): string {
    return this.razonSocial;
  }
  setRazonSocial(razonSocial: string): void {
    this.razonSocial = razonSocial;
  }
}

// Herencia en TypeScript

class Employee {
  name: string;
  protected age: number; // Accesible desde clases que hereden de Employee
  private mobileNumber: string;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.mobileNumber = "";
  }

  // getters y setters...
}

class Manager extends Employee {
  role: string;

  constructor(name: string, age: number, role: string) {
    super(name, age);
    this.role = role;
  }

  // getters y setters de las propiedades de esta clase
}
