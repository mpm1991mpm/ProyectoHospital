import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Habitacion } from '../../models/habitacion.model';

@Component({
  selector: 'app-tabla-habitaciones',
  templateUrl: './tabla-habitaciones.component.html',
  styleUrl: './tabla-habitaciones.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablaHabitacionesComponent {
  habitaciones = input<Habitacion[]>([]);
  loading = input<boolean>(false);

  editHabitacion = output<Habitacion>();
  deleteHabitacion = output<number>();

  onEdit(habitacion: Habitacion): void {
    this.editHabitacion.emit(habitacion);
  }

  onDelete(id: number | undefined): void {
    if (id != null) {
      this.deleteHabitacion.emit(id);
    }
  }
}