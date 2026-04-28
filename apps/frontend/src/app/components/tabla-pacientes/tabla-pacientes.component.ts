import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
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

  editPaciente = output<Paciente>();
  deletePaciente = output<number>();
  markReviewed = output<number>();

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

  rowClass(paciente: Paciente): string {
    const base = 'transition-colors align-top cursor-pointer';
    if (this.isAlta(paciente)) {
      return `${base} bg-green-100 hover:bg-green-200`;
    }
    if (!this.isRevisado(paciente)) {
      return `${base} bg-yellow-100 hover:bg-yellow-200`;
    }
    return `${base} hover:bg-gray-50`;
  }

  boolLabel(value: boolean | undefined): string {
    return value ? 'Si' : 'No';
  }

  safeText(value: string | undefined): string {
    return value && value.trim().length > 0 ? value : '-';
  }
}
