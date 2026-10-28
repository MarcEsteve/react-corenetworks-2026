export interface Vehiculo {
  _id: string
  matricula: string
  marca: string
  modelo: string
  color: string
  seguroEnVigor: boolean
  fechaUltimaITV: string
}

export type VehiculoInput = Omit<Vehiculo, '_id'>
