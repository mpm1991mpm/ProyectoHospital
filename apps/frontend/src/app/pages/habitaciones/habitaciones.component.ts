import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HabitacionService } from '../../services/habitacion.service';
import { Habitacion } from '../../models/habitacion.model';

@Component({
  selector: 'app-habitaciones',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HabitacionesComponent implements OnInit {
  private habitacionService = inject(HabitacionService);

  habitaciones = this.habitacionService.habitaciones;
  loading = this.habitacionService.loading;

  showModal = signal(false);
  isEditing = signal(false);
  searchTerm = signal('');
  selectedPlanta = signal('all');

  formData = signal<Habitacion>({
    numero: '',
    planta: '',
    observaciones: ''
  });

  filteredHabitaciones = computed(() => {
    let filtered = this.habitaciones();

    const search = this.searchTerm().toLowerCase();
    if (search) {
      filtered = filtered.filter(h =>
        h.numero.toLowerCase().includes(search) ||
        h.planta.toLowerCase().includes(search) ||
        h.observaciones?.toLowerCase().includes(search)
      );
    }

    const planta = this.selectedPlanta();
    if (planta !== 'all') {
      filtered = filtered.filter(h => h.planta === planta);
    }

    return filtered;
  });

  plantas = computed(() => {
    const plantasSet = new Set(this.habitaciones().map(h => h.planta));
    return Array.from(plantasSet).sort();
  });

  stats = computed(() => ({
    total: this.habitaciones().length,
    filtered: this.filteredHabitaciones().length
  }));

  ngOnInit() {
    this.loadHabitaciones();
  }

  loadHabitaciones() {
    this.habitacionService.getAll().subscribe();
  }

  openCreateModal() {
    this.isEditing.set(false);
    this.formData.set({ numero: '', planta: '', observaciones: '' });
    this.showModal.set(true);
  }

  openEditModal(habitacion: Habitacion) {
    this.isEditing.set(true);
    this.formData.set({ ...habitacion });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.formData.set({ numero: '', planta: '', observaciones: '' });
  }

  saveHabitacion() {
    const data = this.formData();

    if (!data.numero || !data.planta) {
      alert('Número y planta son obligatorios');
      return;
    }

    if (this.isEditing() && data.id) {
      this.habitacionService.update(data.id, data).subscribe({
        next: () => this.closeModal(),
        error: (err) => alert('Error al actualizar: ' + err.message)
      });
    } else {
      this.habitacionService.create(data).subscribe({
        next: () => this.closeModal(),
        error: (err) => alert('Error al crear: ' + err.message)
      });
    }
  }

  deleteHabitacion(id: number) {
    if (confirm('¿Estás seguro de eliminar esta habitación?')) {
      this.habitacionService.delete(id).subscribe({
        error: (err) => alert('Error al eliminar: ' + err.message)
      });
    }
  }

  updateFormField(field: keyof Habitacion, value: string) {
    this.formData.update(data => ({ ...data, [field]: value }));
  }
}
