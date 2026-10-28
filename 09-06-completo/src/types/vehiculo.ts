export type Combustible = "Gasolina" | "Diésel" | "Eléctrico" | "Híbrido" | "GLP";

export interface Vehiculo {
  id: string;
  matricula: string;
  marca: string;
  modelo: string;
  anioMatriculacion: number;
  combustible: Combustible;
  itvVigente: boolean;
  seguroVigente: boolean;
  createdBy?: string;
}

export type VehiculoInput = Omit<Vehiculo, "id" | "createdBy">;
