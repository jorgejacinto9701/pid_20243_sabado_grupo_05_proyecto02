import { Sede } from './Sede';
import { Cancha } from './Cancha';

export interface Reserva {
  id: number;
  sede: Sede;
  cancha: Cancha;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  precio: number;
}
