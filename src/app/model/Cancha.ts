import { Sede, EstadoSede } from './Sede';

export interface Cancha {
  id: number;
  tipoCancha: string;
  sede: Sede;
  deporte: DeporteEnum;
  precio: number;
  estado: EstadoSede;
}

export enum DeporteEnum {
  Futbol = 'Futbol',
  Voley = 'Voley',
  Basket = 'Basket',
  Tenis = 'Tenis',
  Natacion = 'Natacion'
}

