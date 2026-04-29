import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Unidad } from '../../models/paciente.model';

export type BoolFilter = 'TODOS' | 'SI' | 'NO';
export type UnidadFilter = 'TODAS' | Unidad;
export type SortField = 'HABITACION_CAMA' | 'UNIDAD' | 'ALTA' | 'FECHA_INGRESO';
export type SortDirection = 'ASC' | 'DESC';

@Component({
  selector: 'app-buscador-pacientes',
  templateUrl: './buscador-pacientes.component.html',
  styleUrl: './buscador-pacientes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuscadorPacientesComponent {
  searchTerm = input<string>('');
  altaFilter = input<BoolFilter>('TODOS');
  revisadoFilter = input<BoolFilter>('TODOS');
  unidadFilter = input<UnidadFilter>('TODAS');
  sortField = input<SortField>('HABITACION_CAMA');
  sortDirection = input<SortDirection>('ASC');

  searchTermChange = output<string>();
  altaFilterChange = output<BoolFilter>();
  revisadoFilterChange = output<BoolFilter>();
  unidadFilterChange = output<UnidadFilter>();
  sortFieldChange = output<SortField>();
  sortDirectionChange = output<SortDirection>();

  unidadOptions: Unidad[] = ['TRA', 'UMI', 'COL', 'MS', 'PIE', 'ECTO'];

  onSearch(value: string): void {
    this.searchTermChange.emit(value);
  }

  onAltaFilterChange(value: BoolFilter): void {
    this.altaFilterChange.emit(value);
  }

  onRevisadoFilterChange(value: BoolFilter): void {
    this.revisadoFilterChange.emit(value);
  }

  onUnidadFilterChange(value: string): void {
    this.unidadFilterChange.emit(value as UnidadFilter);
  }

  onSortFieldChange(value: string): void {
    this.sortFieldChange.emit(value as SortField);
  }

  onSortDirectionChange(value: string): void {
    this.sortDirectionChange.emit(value as SortDirection);
  }
}
