export interface Sede {
  id: number;
  nombre: string;
  direccion: string;
  distrito: string;
  telefono: string;
  email: string;
  capacidad: number;
  horarioApertura: string;
  horarioCierre: string;
  estado: EstadoSede;
}

export enum EstadoSede {
  Activo = 'Activo',
  Inactivo = 'Inactivo',
  Mantenimiento = 'Mantenimiento'
}
