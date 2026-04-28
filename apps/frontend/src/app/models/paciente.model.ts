export type Unidad = 'TRA' | 'UMI' | 'COL' | 'MS' | 'PIE' | 'ECTO';
export type TipoAccesoVenoso = 'VP' | 'VC' | 'LM';
export type TipoDrenaje = 'ASPIRATIVO' | 'INTERMITENTE';
export type Tramo = 'MANANA' | 'TARDE';
export type ColorMarca = 'ROJO' | 'NARANJA' | 'AZUL' | 'MORADO' | 'TURQUESA';

export interface HabitacionBasic {
  id: number;
  nombre: string;
  planta: string;
}

export interface Preanestesia {
  id?: number;
  tipaje: boolean;
  fecha: string;
  premedicacion?: string;
}

export interface Rx {
  id?: number;
  realizado: boolean;
  fecha: string;
  tramo: Tramo;
}

export interface SV {
  id?: number;
  realizado: boolean;
  fecha: string;
}

export interface AccesoVenoso {
  id?: number;
  tipo: TipoAccesoVenoso;
  fecha: string;
}

export interface Drenaje {
  id?: number;
  tipo: TipoDrenaje;
}

export interface Analitica {
  id?: number;
  realizada: boolean;
  fecha: string;
}

export interface Cura {
  id?: number;
  nombre: string;
  observaciones?: string;
  fecha: string;
}

export interface Prueba {
  id?: number;
  nombre: string;
  observaciones?: string;
  fecha: string;
}

export interface Paciente {
  id?: number;
  nombre: string;
  diagnostico: string;
  unidad: Unidad;
  alta: boolean;
  ambulancia?: boolean;
  preanestesia?: Preanestesia | null;
  accesosVenosos?: AccesoVenoso[];
  drenajes?: Drenaje[];
  rx?: Rx | null;
  sv?: SV | null;
  observaciones?: string;
  fechaIQ?: string;
  fechaIngreso: string;
  analiticas?: Analitica[];
  curas?: Cura[];
  pruebas?: Prueba[];
  alergias?: string;
  colorMarca?: ColorMarca;
  revisado: boolean;
  cama: number;
  habitacionId?: number;
  habitacion?: HabitacionBasic;
}
