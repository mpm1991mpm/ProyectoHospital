export interface Habitacion {
  id?: number;
  nombre: string;
  planta: string;
  capacidad: 'INDIVIDUAL' | 'DOBLE';
  observaciones?: string;
}
