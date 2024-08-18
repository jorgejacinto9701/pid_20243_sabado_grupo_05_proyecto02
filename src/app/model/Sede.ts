export interface Sede {
  id: number;
  nombre: string;
  departamento:string;
  provincia:string;
  distrito: string;
  direccion: string;
  telefono: string;
  email: string;
  capacidad: number;
  horarioApertura: string;
  horarioCierre: string;
  estado: EstadoSede;
  ubigeo: Ubigeo;
}

export interface Ubigeo {
  id: number;
  departamento: string;
  provincia: string;
  distrito: string;
}

export enum EstadoSede {
  Activo = 'Activo',
  Inactivo = 'Inactivo',
  Mantenimiento = 'Mantenimiento'
}
