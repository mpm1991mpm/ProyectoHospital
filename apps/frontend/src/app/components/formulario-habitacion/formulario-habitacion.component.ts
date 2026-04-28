import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Habitacion } from '../../models/habitacion.model';

type HabitacionField = 'nombre' | 'planta' | 'capacidad' | 'observaciones';

@Component({
  selector: 'app-formulario-habitacion',
  templateUrl: './formulario-habitacion.component.html',
  styleUrl: './formulario-habitacion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioHabitacionComponent {
  show = input<boolean>(false);
  isEditing = input<boolean>(false);
  formData = input<Habitacion>({
    nombre: '',
    planta: '',
    capacidad: 'INDIVIDUAL',
    observaciones: '',
  });

  close = output<void>();
  save = output<void>();
  fieldChange = output<{ field: HabitacionField; value: string }>();

  onFieldChange(field: HabitacionField, value: string): void {
    this.fieldChange.emit({ field, value });
  }

  onClose(): void {
    this.close.emit();
  }

  onSave(): void {
    this.save.emit();
  }
}