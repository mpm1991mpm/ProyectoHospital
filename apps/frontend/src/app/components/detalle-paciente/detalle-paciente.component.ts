import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { BloquesClinicosPacienteComponent } from '../bloques-clinicos-paciente/bloques-clinicos-paciente.component';

@Component({
  selector: 'app-detalle-paciente',
  imports: [BloquesClinicosPacienteComponent],
  templateUrl: './detalle-paciente.component.html',
  styleUrl: './detalle-paciente.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetallePacienteComponent {
  paciente = input.required<Paciente>();

  boolLabel(value: boolean | undefined): string {
    return value ? 'Si' : 'No';
  }

  safeText(value: string | undefined): string {
    return value && value.trim().length > 0 ? value : '-';
  }
}

