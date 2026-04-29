import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Paciente } from '../../models/paciente.model';

type ClinicalBlock = 'pre' | 'tip' | 'rx' | 'sv' | 'av' | 'dren' | 'ana' | 'cur' | 'pru';

@Component({
  selector: 'app-bloques-clinicos-paciente',
  templateUrl: './bloques-clinicos-paciente.component.html',
  styleUrl: './bloques-clinicos-paciente.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BloquesClinicosPacienteComponent {
  paciente = input.required<Paciente>();
  selectedBlock = signal<ClinicalBlock | null>(null);

  toggleBlock(block: ClinicalBlock): void {
    this.selectedBlock.update((current) => (current === block ? null : block));
  }

  isBlockSelected(block: ClinicalBlock): boolean {
    return this.selectedBlock() === block;
  }

  safeText(value: string | undefined): string {
    return value && value.trim().length > 0 ? value : '-';
  }

  listCount<T>(items: T[] | undefined): number {
    return items?.length ?? 0;
  }

  tramoLabel(value: string | undefined): string {
    if (value === 'MANANA') return 'Manana';
    if (value === 'TARDE') return 'Tarde';
    return '-';
  }
}
