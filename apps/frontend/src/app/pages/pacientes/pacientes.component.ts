import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { HabitacionService } from '../../services/habitacion.service';
import { Paciente } from '../../models/paciente.model';
import { Habitacion } from '../../models/habitacion.model';

@Component({
  selector: 'app-pacientes',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PacientesComponent implements OnInit {
  private pacienteService = inject(PacienteService);
  private habitacionService = inject(HabitacionService);

  pacientes = this.pacienteService.pacientes;
  habitaciones = this.habitacionService.habitaciones;
  loading = this.pacienteService.loading;

  showModal = signal(false);
  isEditing = signal(false);
  searchTerm = signal('');
  filterStatus = signal<'all' | 'assigned' | 'unassigned'>('all');

  formData = signal<Paciente>({
    nombre: '',
    observaciones: '',
    habitacionId: undefined
  });

  filteredPacientes = computed(() => {
    let filtered = this.pacientes();

    const search = this.searchTerm().toLowerCase();
    if (search) {
      filtered = filtered.filter(p =>
        p.nombre.toLowerCase().includes(search) ||
        p.observaciones?.toLowerCase().includes(search) ||
        p.habitacion?.numero.toLowerCase().includes(search)
      );
    }

    const status = this.filterStatus();
    if (status === 'assigned') {
      filtered = filtered.filter(p => p.habitacionId);
    } else if (status === 'unassigned') {
      filtered = filtered.filter(p => !p.habitacionId);
    }

    return filtered;
  });

  stats = computed(() => ({
    total: this.pacientes().length,
    assigned: this.pacientes().filter(p => p.habitacionId).length,
    unassigned: this.pacientes().filter(p => !p.habitacionId).length,
    filtered: this.filteredPacientes().length
  }));

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.pacienteService.getAll().subscribe();
    this.habitacionService.getAll().subscribe();
  }

  openCreateModal() {
    this.isEditing.set(false);
    this.formData.set({ nombre: '', observaciones: '', habitacionId: undefined });
    this.showModal.set(true);
  }

  openEditModal(paciente: Paciente) {
    this.isEditing.set(true);
    this.formData.set({ ...paciente });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.formData.set({ nombre: '', observaciones: '', habitacionId: undefined });
  }

  savePaciente() {
    const data = this.formData();

    if (!data.nombre) {
      alert('El nombre es obligatorio');
      return;
    }

    const payload: Paciente = {
      nombre: data.nombre,
      observaciones: data.observaciones || '',
      habitacionId: data.habitacionId
    };

    if (this.isEditing() && data.id) {
      this.pacienteService.update(data.id, payload).subscribe({
        next: () => this.closeModal(),
        error: (err) => alert('Error al actualizar: ' + err.message)
      });
    } else {
      this.pacienteService.create(payload).subscribe({
        next: () => this.closeModal(),
        error: (err) => alert('Error al crear: ' + err.message)
      });
    }
  }

  parseNumber(value: string): number | undefined {
    return value ? Number(value) : undefined;
  }

  deletePaciente(id: number) {
    if (confirm('¿Estás seguro de eliminar este paciente?')) {
      this.pacienteService.delete(id).subscribe({
        error: (err) => alert('Error al eliminar: ' + err.message)
      });
    }
  }

  updateFormField(field: keyof Paciente, value: string | number | undefined) {
    this.formData.update(data => ({ ...data, [field]: value }));
  }

  getHabitacionDisplay(paciente: Paciente): string {
    if (!paciente.habitacion) return 'Sin asignar';
    return `${paciente.habitacion.numero} - Planta ${paciente.habitacion.planta}`;
  }
}
