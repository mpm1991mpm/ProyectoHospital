import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PacienteService } from '../../services/paciente.service';
import { HabitacionService } from '../../services/habitacion.service';
import { ColorMarca, Paciente } from '../../models/paciente.model';
import { BuscadorPacientesComponent } from '../../components/buscador-pacientes/buscador-pacientes.component';
import { BoolFilter, UnidadFilter } from '../../components/buscador-pacientes/buscador-pacientes.component';
import { TablaPacientesComponent } from '../../components/tabla-pacientes/tabla-pacientes.component';
import { FormularioPacienteComponent } from '../../components/formulario-paciente/formulario-paciente.component';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { SidebarNavComponent } from '../../components/sidebar-nav/sidebar-nav.component';
type ViewMode = 'tabla' | 'habitaciones';

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function getDefaultPaciente(): Paciente {
  return {
    nombre: '',
    diagnostico: '',
    unidad: 'TRA',
    alta: false,
    ambulancia: false,
    preanestesia: null,
    accesosVenosos: undefined,
    drenajes: undefined,
    rx: null,
    sv: null,
    observaciones: '',
    fechaIQ: '',
    fechaIngreso: today(),
    analiticas: undefined,
    curas: undefined,
    pruebas: undefined,
    alergias: '',
    revisado: false,
    cama: 1,
    habitacionId: undefined,
  };
}

function clonePaciente(paciente: Paciente): Paciente {
  return {
    ...getDefaultPaciente(),
    ...paciente,
    preanestesia: paciente.preanestesia ? { ...paciente.preanestesia } : null,
    rx: paciente.rx ? { ...paciente.rx } : null,
    sv: paciente.sv ? { ...paciente.sv } : null,
    accesosVenosos: paciente.accesosVenosos?.map((item) => ({ ...item })),
    drenajes: paciente.drenajes?.map((item) => ({ ...item })),
    analiticas: paciente.analiticas?.map((item) => ({ ...item })),
    curas: paciente.curas?.map((item) => ({ ...item })),
    pruebas: paciente.pruebas?.map((item) => ({ ...item })),
  };
}

@Component({
  selector: 'app-pacientes',
  imports: [
    CommonModule,
    RouterModule,
    BuscadorPacientesComponent,
    PageHeaderComponent,
    SidebarNavComponent,
    TablaPacientesComponent,
    FormularioPacienteComponent,
  ],
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
  altaFilter = signal<BoolFilter>('TODOS');
  revisadoFilter = signal<BoolFilter>('TODOS');
  unidadFilter = signal<UnidadFilter>('TODAS');
  viewMode = signal<ViewMode>('tabla');
  expandedRoomSections = signal<Record<string, boolean>>({});
  mobileSidebarOpen = signal(false);

  formData = signal<Paciente>(getDefaultPaciente());

  filteredPacientes = computed(() => {
    const search = this.searchTerm().toLowerCase().trim();
    const altaFilter = this.altaFilter();
    const revisadoFilter = this.revisadoFilter();
    const unidadFilter = this.unidadFilter();

    const filtered = this.pacientes().filter((paciente) => {
      const byName = paciente.nombre.toLowerCase().includes(search);
      if (!byName) return false;

      if (unidadFilter !== 'TODAS' && paciente.unidad !== unidadFilter) {
        return false;
      }

      if (altaFilter === 'SI' && paciente.alta !== true) return false;
      if (altaFilter === 'NO' && paciente.alta !== false) return false;

      if (revisadoFilter === 'SI' && paciente.revisado !== true) return false;
      if (revisadoFilter === 'NO' && paciente.revisado !== false) return false;

      return true;
    });

    return this.sortPacientes(filtered);
  });

  pacientesPorHabitacion = computed(() => {
    const groups = new Map<string, { title: string; pacientes: Paciente[] }>();

    for (const paciente of this.filteredPacientes()) {
      const title = paciente.habitacion?.nombre || 'Sin habitacion';
      if (!groups.has(title)) {
        groups.set(title, { title, pacientes: [] });
      }
      groups.get(title)!.pacientes.push(paciente);
    }

    return Array.from(groups.values()).sort((a, b) => a.title.localeCompare(b.title, 'es'));
  });

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.pacienteService.getAll().subscribe();
    this.habitacionService.getAll().subscribe();
  }

  openCreateModal(): void {
    this.isEditing.set(false);
    this.formData.set(getDefaultPaciente());
    this.showModal.set(true);
  }

  openEditModal(paciente: Paciente): void {
    this.isEditing.set(true);
    this.formData.set(clonePaciente(paciente));
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.formData.set(getDefaultPaciente());
  }

  savePaciente(data: Paciente): void {
    const payload = this.normalizePayload(data);

    if (!payload.nombre) {
      alert('El nombre del paciente es obligatorio');
      return;
    }
    if (!payload.unidad) {
      alert('La unidad es obligatoria');
      return;
    }
    if (!payload.diagnostico) {
      alert('El diagnostico es obligatorio');
      return;
    }
    if (!payload.fechaIngreso) {
      alert('La fecha de ingreso es obligatoria');
      return;
    }
    if (!payload.cama || payload.cama < 1) {
      alert('La cama es obligatoria y debe ser mayor que 0');
      return;
    }
    if (!payload.habitacionId) {
      alert('La habitacion es obligatoria');
      return;
    }

    if (this.isEditing() && payload.id) {
      this.pacienteService.update(payload.id, payload).subscribe({
        next: () => this.closeModal(),
        error: (err) => alert('Error al actualizar: ' + err.message),
      });
    } else {
      this.pacienteService.create(payload).subscribe({
        next: () => this.closeModal(),
        error: (err) => alert('Error al crear: ' + err.message),
      });
    }
  }

  deletePaciente(id: number): void {
    if (confirm('Estas seguro de eliminar este paciente?')) {
      this.pacienteService.delete(id).subscribe({
        error: (err) => alert('Error al eliminar: ' + err.message),
      });
    }
  }

  markPacienteRevisado(id: number): void {
    const current = this.pacientes().find((p) => p.id === id);
    if (!current || current.revisado) {
      return;
    }

    const payload = this.normalizePayload({
      ...clonePaciente(current),
      revisado: true,
    });

    this.pacienteService.update(id, payload).subscribe({
      error: (err) => alert('Error al marcar como revisado: ' + err.message),
    });
  }

  markPacienteColor(payload: { id: number; colorMarca: ColorMarca | null }): void {
    const current = this.pacientes().find((p) => p.id === payload.id);
    if (!current) return;

    const updatedPayload = this.normalizePayload({
      ...clonePaciente(current),
      colorMarca: payload.colorMarca ?? undefined,
    });

    this.pacienteService.update(payload.id, updatedPayload).subscribe({
      error: (err) => alert('Error al actualizar color: ' + err.message),
    });
  }

  toggleRoomSection(title: string): void {
    this.expandedRoomSections.update((current) => ({
      ...current,
      [title]: !current[title],
    }));
  }

  isRoomSectionExpanded(title: string): boolean {
    return this.expandedRoomSections()[title] ?? true;
  }

  toggleMobileSidebar(): void {
    this.mobileSidebarOpen.update((v) => !v);
  }

  closeMobileSidebar(): void {
    this.mobileSidebarOpen.set(false);
  }

  private sortPacientes(pacientes: Paciente[]): Paciente[] {
    return [...pacientes].sort((a, b) => {
      const altaA = a.alta === true ? 1 : 0;
      const altaB = b.alta === true ? 1 : 0;
      if (altaA !== altaB) {
        return altaB - altaA;
      }

      const habA = (a.habitacion?.nombre || '').toLowerCase();
      const habB = (b.habitacion?.nombre || '').toLowerCase();
      if (habA !== habB) {
        return habA.localeCompare(habB, 'es');
      }

      return a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase(), 'es');
    });
  }

  private normalizePayload(paciente: Paciente): Paciente {
    const payload = clonePaciente(paciente);
    payload.nombre = payload.nombre.trim();
    payload.diagnostico = payload.diagnostico.trim();
    payload.observaciones = payload.observaciones?.trim() || undefined;
    payload.alergias = payload.alergias?.trim() || undefined;
    payload.fechaIQ = payload.fechaIQ?.trim() || undefined;
    payload.habitacion = undefined;
    return payload;
  }
}
