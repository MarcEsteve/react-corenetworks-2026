// Clases en TypeScript

class Jugador {
  // Atributos
  public nombre: string; // "public" es el modificador por defecto, se puede omitir
  apellidos: string; // sin modificador también es público
  private goles: number; // solo accesible dentro de la propia clase

  // Constructor: inicializa los atributos al crear la instancia
  constructor(name: string, surname: string) {
    this.nombre = name;
    this.apellidos = surname;
    this.goles = 0;
  }

  // Getter y setter para acceder/modificar el atributo privado "goles"
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

// Constructor breve (shorthand): al anteponer un modificador de acceso
// (public/private/protected) a un parámetro del constructor, TypeScript
// crea y asigna automáticamente la propiedad, sin necesidad de declararla
// aparte ni de escribir "this.x = x" manualmente.

class Player {
  constructor(
    public name: string,
    public surname: string,
    private goals: number,
  ) {}

  // Getter del atributo privado "goals"
  getGoles(): number {
    return this.goals;
  }
}

let jugador2 = new Player("Lionel", "Messi", 3);
console.log(jugador2.getGoles()); //3

// Interfaces como tipado estructural: definen la "forma" que debe tener un
// objeto (qué propiedades tiene y de qué tipo), sin necesidad de una clase.

interface EstadoBoton {
  hidden: boolean;
  disabled: boolean;
  waiting: boolean;
  backgroundColor?: string; // el "?" marca la propiedad como opcional
  fontSize?: number; // opcional
  color?: string; // opcional
}

let estadoBotonEnvio: EstadoBoton = {
  hidden: false,
  disabled: true,
  waiting: false,
  backgroundColor: "green",
  fontSize: 20,
  color: "white",

  // Al ser opcionales, omitir estas propiedades no provoca error
};

// Interfaces como contrato obligatorio para clases: una clase que usa
// "implements" debe definir todas las propiedades y métodos de la interfaz.

interface DatosMaestros {
  razonSocial: string;
  cif: string;

  getCif(): string;
  setCif(cif: string): void;

  getRazonSocial(): string;
  setRazonSocial(razonSocial: string): void;
}

class Proveedor implements DatosMaestros {
  // Constructor breve: crea y asigna "razonSocial" y "cif" automáticamente
  constructor(
    public razonSocial: string,
    public cif: string,
  ) {}

  // Getters y setters exigidos por la interfaz DatosMaestros
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

// Herencia en TypeScript: una clase ("subclase") puede extender otra
// ("superclase") con "extends", reutilizando y ampliando su funcionalidad.

class Employee {
  name: string; // público: accesible desde cualquier parte
  protected age: number; // accesible desde Employee y sus clases hijas (extends)
  private mobileNumber: string; // accesible solo dentro de Employee

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    this.mobileNumber = "";
  }

  // getters y setters...
}

class Manager extends Employee {
  role: string;

  // "super(...)" llama al constructor de la clase padre (Employee)
  constructor(name: string, age: number, role: string) {
    super(name, age);
    this.role = role;
  }

  // Getter y setter propios de Manager
  getRole(): string {
    return this.role;
  }

  setRole(role: string): void {
    this.role = role;
  }
}
