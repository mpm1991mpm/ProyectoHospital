import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HabitacionService } from '../../services/habitacion.service';
import { Habitacion } from '../../models/habitacion.model';
import { BuscadorHabitacionesComponent } from '../../components/buscador-habitaciones/buscador-habitaciones.component';
import { TablaHabitacionesComponent } from '../../components/tabla-habitaciones/tabla-habitaciones.component';
import { FormularioHabitacionComponent } from '../../components/formulario-habitacion/formulario-habitacion.component';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { SidebarNavComponent } from '../../components/sidebar-nav/sidebar-nav.component';

@Component({
  selector: 'app-habitaciones',
  imports: [
    CommonModule,
    RouterModule,
    PageHeaderComponent,
    SidebarNavComponent,
    BuscadorHabitacionesComponent,
    TablaHabitacionesComponent,
    FormularioHabitacionComponent
  ],
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
  mobileSidebarOpen = signal(false);

  formData = signal<Habitacion>({
    nombre: '',
    planta: '',
    capacidad: 'INDIVIDUAL',
    observaciones: ''
  });

  filteredHabitaciones = computed(() => {
    const search = this.searchTerm().toLowerCase();
    return this.habitaciones().filter(h => h.nombre.toLowerCase().includes(search));
  });

  ngOnInit() {
    this.loadHabitaciones();
  }

  loadHabitaciones() {
    this.habitacionService.getAll().subscribe();
  }

  openCreateModal() {
    this.isEditing.set(false);
    this.formData.set({ nombre: '', planta: '', capacidad: 'INDIVIDUAL', observaciones: '' });
    this.showModal.set(true);
  }

  openEditModal(habitacion: Habitacion) {
    this.isEditing.set(true);
    this.formData.set({ ...habitacion });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.formData.set({ nombre: '', planta: '', capacidad: 'INDIVIDUAL', observaciones: '' });
  }

  saveHabitacion() {
    const data = this.formData();

    if (!data.nombre || !data.planta || !data.capacidad) {
      alert('Nombre, planta y capacidad son obligatorios');
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
    this.formData.update(data => ({ ...data, [field]: field === 'capacidad' ? (value as Habitacion['capacidad']) : value }));
  }

  toggleMobileSidebar() {
    this.mobileSidebarOpen.update(v => !v);
  }

  closeMobileSidebar() {
    this.mobileSidebarOpen.set(false);
  }
}
