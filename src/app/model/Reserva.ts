import { Sede } from './Sede';
import { Cancha } from './Cancha';
import { User } from './user';

export interface Reserva {
  id: number | null;
  sede: Sede;
  cancha: Cancha;
  usuario: User;
  fecha: string; // Considera usar `Date` si prefieres manejar la fecha directamente
  horaInicio: string; // Considera usar `Date` o `Time` si prefieres manejar la hora directamente
  horaFin: string; // Considera usar `Date` o `Time` si prefieres manejar la hora directamente
  cantidadHoras: number;
  precioUnitario: number;
  medioPago: string; // Puede ser un enum o string con valores como 'Efectivo', 'Tarjeta', 'Depósito'
  // Puedes usar `Date` o `Time` según tus necesidades
}

