export interface Paciente {
  id?: number;
  nombre: string;
  observaciones?: string;
  habitacionId?: number;
  habitacion?: {
    id: number;
    numero: string;
    planta: string;
  };
}
