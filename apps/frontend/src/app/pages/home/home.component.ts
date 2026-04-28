import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HabitacionService } from '../../services/habitacion.service';
import { PacienteService } from '../../services/paciente.service';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { HomeSectionCardComponent } from '../../components/home-section-card/home-section-card.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, PageHeaderComponent, HomeSectionCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private habitacionService = inject(HabitacionService);
  private pacienteService = inject(PacienteService);

  habitaciones = this.habitacionService.habitaciones;
  pacientes = this.pacienteService.pacientes;
  fullscreenEnabled = signal<boolean>(!!document.fullscreenEnabled);

  totalHabitaciones = computed(() => this.habitaciones().length);
  totalPacientes = computed(() => this.pacientes().length);

  ngOnInit(): void {
    this.habitacionService.getAll().subscribe();
    this.pacienteService.getAll().subscribe();
  }

  get isFullscreen(): boolean {
    return !!document.fullscreenElement;
  }

  toggleFullscreen(): void {
    if (!this.fullscreenEnabled()) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }
}
