import { Sede } from './Sede';
import { Cancha } from './Cancha';

export interface Reserva {
  id: number;
  sede: Sede;
  cancha: Cancha;
  fecha: string; // Considera usar `Date` si prefieres un objeto de fecha
  horaInicio: string; // Puedes usar `Date` o `Time` según tus necesidades
  horaFin: string;
  medioPago: string; // Puedes usar `Date` o `Time` según tus necesidades
}

