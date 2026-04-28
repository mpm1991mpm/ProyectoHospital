import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-buscador-habitaciones',
  templateUrl: './buscador-habitaciones.component.html',
  styleUrl: './buscador-habitaciones.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuscadorHabitacionesComponent {
  searchTerm = input<string>('');
  searchTermChange = output<string>();

  onSearch(value: string): void {
    this.searchTermChange.emit(value);
  }
}