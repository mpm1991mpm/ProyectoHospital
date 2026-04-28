import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { ColorMarca, Paciente } from '../../models/paciente.model';
import { DetallePacienteComponent } from '../detalle-paciente/detalle-paciente.component';

@Component({
  selector: 'app-tabla-pacientes',
  imports: [DetallePacienteComponent],
  templateUrl: './tabla-pacientes.component.html',
  styleUrl: './tabla-pacientes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablaPacientesComponent {
  pacientes = input<Paciente[]>([]);
  loading = input<boolean>(false);
  expandedPacienteId = signal<number | null>(null);
  colorMenuPacienteId = signal<number | null>(null);
  readonly colorOptions: Array<{ value: ColorMarca | null; label: string; swatchClass: string; strike?: boolean }> = [
    { value: null, label: 'Sin color', swatchClass: 'bg-white border-gray-400', strike: true },
    { value: 'ROJO', label: 'Rojo', swatchClass: 'bg-red-300 border-red-500' },
    { value: 'NARANJA', label: 'Naranja', swatchClass: 'bg-orange-300 border-orange-500' },
    { value: 'AZUL', label: 'Azul', swatchClass: 'bg-blue-300 border-blue-500' },
    { value: 'MORADO', label: 'Morado', swatchClass: 'bg-purple-300 border-purple-500' },
    { value: 'TURQUESA', label: 'Turquesa', swatchClass: 'bg-cyan-300 border-cyan-500' },
  ];

  editPaciente = output<Paciente>();
  deletePaciente = output<number>();
  markReviewed = output<number>();
  markColor = output<{ id: number; colorMarca: ColorMarca | null }>();

  toggleExpanded(id: number | undefined): void {
    if (id == null) return;
    this.expandedPacienteId.update((current) => {
      return current === id ? null : id;
    });
  }

  isExpanded(id: number | undefined): boolean {
    return id != null && this.expandedPacienteId() === id;
  }

  isAlta(paciente: Paciente): boolean {
    return (paciente as { alta?: unknown }).alta === true;
  }

  isRevisado(paciente: Paciente): boolean {
    return (paciente as { revisado?: unknown }).revisado === true;
  }

  onEdit(event: MouseEvent, paciente: Paciente): void {
    event.stopPropagation();
    this.editPaciente.emit(paciente);
  }

  onDelete(event: MouseEvent, id: number | undefined): void {
    event.stopPropagation();
    if (id != null) {
      this.deletePaciente.emit(id);
    }
  }

  onMarkReviewed(event: MouseEvent, id: number | undefined): void {
    event.stopPropagation();
    if (id != null) {
      this.markReviewed.emit(id);
    }
  }

  toggleColorMenu(event: MouseEvent, id: number | undefined): void {
    event.stopPropagation();
    if (id == null) return;
    this.colorMenuPacienteId.update((current) => (current === id ? null : id));
  }

  isColorMenuOpen(id: number | undefined): boolean {
    return id != null && this.colorMenuPacienteId() === id;
  }

  setColor(event: MouseEvent, id: number | undefined, colorMarca: ColorMarca | null): void {
    event.stopPropagation();
    if (id == null) return;
    this.markColor.emit({ id, colorMarca });
    this.colorMenuPacienteId.set(null);
  }

  colorLabel(colorMarca: ColorMarca | null): string {
    switch (colorMarca) {
      case 'ROJO': return 'Rojo';
      case 'NARANJA': return 'Naranja';
      case 'AZUL': return 'Azul';
      case 'MORADO': return 'Morado';
      case 'TURQUESA': return 'Turquesa';
      default: return 'Color por defecto';
    }
  }

  rowClass(paciente: Paciente): string {
    const base = 'transition-colors align-top cursor-pointer';
    if (this.isAlta(paciente)) {
      return `${base} bg-green-100 hover:bg-green-200`;
    }
    if (paciente.colorMarca) {
      const manualColor = this.manualColorClass(paciente.colorMarca);
      if (manualColor) return `${base} ${manualColor}`;
    }
    if (!this.isRevisado(paciente)) {
      return `${base} bg-yellow-100 hover:bg-yellow-200`;
    }
    return `${base} hover:bg-gray-50`;
  }

  private manualColorClass(colorMarca: ColorMarca): string | null {
    switch (colorMarca) {
      case 'ROJO': return 'bg-red-100 hover:bg-red-200';
      case 'NARANJA': return 'bg-orange-100 hover:bg-orange-200';
      case 'AZUL': return 'bg-blue-100 hover:bg-blue-200';
      case 'MORADO': return 'bg-purple-100 hover:bg-purple-200';
      case 'TURQUESA': return 'bg-cyan-100 hover:bg-cyan-200';
      default: return null;
    }
  }

  boolLabel(value: boolean | undefined): string {
    return value ? 'Si' : 'No';
  }

  safeText(value: string | undefined): string {
    return value && value.trim().length > 0 ? value : '-';
  }
}
