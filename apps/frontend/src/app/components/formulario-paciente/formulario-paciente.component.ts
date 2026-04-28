import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { Habitacion } from '../../models/habitacion.model';
import {
  AccesoVenoso,
  Analitica,
  Cura,
  Drenaje,
  Paciente,
  Preanestesia,
  Prueba,
  Rx,
  SV,
  TipoAccesoVenoso,
  TipoDrenaje,
  Tramo,
  Unidad,
} from '../../models/paciente.model';

type TextField = 'nombre' | 'diagnostico' | 'unidad' | 'fechaIngreso' | 'fechaIQ' | 'alergias' | 'observaciones';
type BooleanField = 'alta' | 'ambulancia' | 'revisado';
type NumberField = 'cama' | 'habitacionId';

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function nowForDateTimeLocal(): string {
  return new Date().toISOString().slice(0, 16);
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
  selector: 'app-formulario-paciente',
  templateUrl: './formulario-paciente.component.html',
  styleUrl: './formulario-paciente.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioPacienteComponent {
  show = input<boolean>(false);
  isEditing = input<boolean>(false);
  formData = input<Paciente>(getDefaultPaciente());
  habitaciones = input<Habitacion[]>([]);

  close = output<void>();
  save = output<Paciente>();

  draft = signal<Paciente>(getDefaultPaciente());
  readonly todayString = today();

  readonly unidadOptions: Unidad[] = ['TRA', 'UMI', 'COL', 'MS', 'PIE', 'ECTO'];
  readonly tramoOptions: Tramo[] = ['MANANA', 'TARDE'];
  readonly accesoOptions: TipoAccesoVenoso[] = ['VP', 'VC', 'LM'];
  readonly drenajeOptions: TipoDrenaje[] = ['ASPIRATIVO', 'INTERMITENTE'];

  constructor() {
    effect(() => {
      this.draft.set(clonePaciente(this.formData()));
    });
  }

  onClose(): void {
    this.close.emit();
  }

  updateTextField(field: TextField, value: string): void {
    this.draft.update((current) => ({ ...current, [field]: value }));
  }

  updateBooleanField(field: BooleanField, value: boolean): void {
    this.draft.update((current) => ({ ...current, [field]: value }));
  }

  updateNumberField(field: NumberField, value: string): void {
    const parsed = value ? Number(value) : undefined;
    this.draft.update((current) => ({ ...current, [field]: parsed }));
  }

  togglePreanestesia(enabled: boolean): void {
    this.draft.update((current) => ({
      ...current,
      preanestesia: enabled
        ? current.preanestesia ?? { tipaje: true, fecha: today(), premedicacion: '' }
        : null,
    }));
  }

  updatePreanestesia(field: keyof Preanestesia, value: string): void {
    this.draft.update((current) => {
      if (!current.preanestesia) return current;
      return { ...current, preanestesia: { ...current.preanestesia, [field]: value } };
    });
  }

  toggleRx(enabled: boolean): void {
    this.draft.update((current) => ({
      ...current,
      rx: enabled ? current.rx ?? { realizado: true, fecha: today(), tramo: 'MANANA' } : null,
    }));
  }

  updateRx(field: keyof Rx, value: string): void {
    this.draft.update((current) => {
      if (!current.rx) return current;
      return { ...current, rx: { ...current.rx, [field]: value } };
    });
  }

  toggleSv(enabled: boolean): void {
    this.draft.update((current) => ({
      ...current,
      sv: enabled ? current.sv ?? { realizado: true, fecha: today() } : null,
    }));
  }

  updateSv(field: keyof SV, value: string): void {
    this.draft.update((current) => {
      if (!current.sv) return current;
      return { ...current, sv: { ...current.sv, [field]: value } };
    });
  }

  toggleAccesos(enabled: boolean): void {
    this.draft.update((current) => ({
      ...current,
      accesosVenosos: enabled ? current.accesosVenosos ?? [{ tipo: 'VP', fecha: today() }] : undefined,
    }));
  }

  addAcceso(): void {
    this.draft.update((current) => ({
      ...current,
      accesosVenosos: [...(current.accesosVenosos ?? []), { tipo: 'VP', fecha: today() }],
    }));
  }

  removeAcceso(index: number): void {
    this.draft.update((current) => ({
      ...current,
      accesosVenosos: (() => {
        const next = (current.accesosVenosos ?? []).filter((_, i) => i !== index);
        return next.length ? next : undefined;
      })(),
    }));
  }

  updateAcceso(index: number, field: keyof AccesoVenoso, value: string): void {
    this.draft.update((current) => ({
      ...current,
      accesosVenosos: (current.accesosVenosos ?? []).map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  }

  toggleDrenajes(enabled: boolean): void {
    this.draft.update((current) => ({
      ...current,
      drenajes: enabled ? current.drenajes ?? [{ tipo: 'ASPIRATIVO' }] : undefined,
    }));
  }

  addDrenaje(): void {
    this.draft.update((current) => ({
      ...current,
      drenajes: [...(current.drenajes ?? []), { tipo: 'ASPIRATIVO' }],
    }));
  }

  removeDrenaje(index: number): void {
    this.draft.update((current) => ({
      ...current,
      drenajes: (() => {
        const next = (current.drenajes ?? []).filter((_, i) => i !== index);
        return next.length ? next : undefined;
      })(),
    }));
  }

  updateDrenaje(index: number, value: string): void {
    this.draft.update((current) => ({
      ...current,
      drenajes: (current.drenajes ?? []).map((item, i) => (i === index ? { ...item, tipo: value as TipoDrenaje } : item)),
    }));
  }

  toggleAnaliticas(enabled: boolean): void {
    this.draft.update((current) => ({
      ...current,
      analiticas: enabled ? current.analiticas ?? [{ realizada: true, fecha: today() }] : undefined,
    }));
  }

  addAnalitica(): void {
    this.draft.update((current) => ({
      ...current,
      analiticas: [...(current.analiticas ?? []), { realizada: true, fecha: today() }],
    }));
  }

  removeAnalitica(index: number): void {
    this.draft.update((current) => ({
      ...current,
      analiticas: (() => {
        const next = (current.analiticas ?? []).filter((_, i) => i !== index);
        return next.length ? next : undefined;
      })(),
    }));
  }

  updateAnalitica(index: number, field: keyof Analitica, value: string | boolean): void {
    this.draft.update((current) => ({
      ...current,
      analiticas: (current.analiticas ?? []).map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  }

  toggleCuras(enabled: boolean): void {
    this.draft.update((current) => ({
      ...current,
      curas: enabled ? current.curas ?? [{ nombre: '', observaciones: '', fecha: today() }] : undefined,
    }));
  }

  addCura(): void {
    this.draft.update((current) => ({
      ...current,
      curas: [...(current.curas ?? []), { nombre: '', observaciones: '', fecha: today() }],
    }));
  }

  removeCura(index: number): void {
    this.draft.update((current) => ({
      ...current,
      curas: (() => {
        const next = (current.curas ?? []).filter((_, i) => i !== index);
        return next.length ? next : undefined;
      })(),
    }));
  }

  updateCura(index: number, field: keyof Cura, value: string): void {
    this.draft.update((current) => ({
      ...current,
      curas: (current.curas ?? []).map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  }

  togglePruebas(enabled: boolean): void {
    this.draft.update((current) => ({
      ...current,
      pruebas: enabled ? current.pruebas ?? [{ nombre: '', observaciones: '', fecha: nowForDateTimeLocal() }] : undefined,
    }));
  }

  addPrueba(): void {
    this.draft.update((current) => ({
      ...current,
      pruebas: [...(current.pruebas ?? []), { nombre: '', observaciones: '', fecha: nowForDateTimeLocal() }],
    }));
  }

  removePrueba(index: number): void {
    this.draft.update((current) => ({
      ...current,
      pruebas: (() => {
        const next = (current.pruebas ?? []).filter((_, i) => i !== index);
        return next.length ? next : undefined;
      })(),
    }));
  }

  updatePrueba(index: number, field: keyof Prueba, value: string): void {
    this.draft.update((current) => ({
      ...current,
      pruebas: (current.pruebas ?? []).map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  }

  tramoLabel(tramo: Tramo): string {
    return tramo === 'MANANA' ? 'Mañana' : 'Tarde';
  }

  onSave(): void {
    const payload = clonePaciente(this.draft());
    if (payload.preanestesia) {
      payload.preanestesia.tipaje = true;
    } else {
      payload.preanestesia = null;
    }
    if (payload.rx) {
      payload.rx.realizado = true;
    } else {
      payload.rx = null;
    }
    if (payload.sv) {
      payload.sv.realizado = true;
    } else {
      payload.sv = null;
    }
    if (payload.analiticas?.length) {
      payload.analiticas = payload.analiticas.map((item) => ({ ...item, realizada: true }));
    }

    if (!payload.accesosVenosos?.length) payload.accesosVenosos = undefined;
    if (!payload.drenajes?.length) payload.drenajes = undefined;
    if (!payload.analiticas?.length) payload.analiticas = undefined;
    if (!payload.curas?.length) payload.curas = undefined;
    if (!payload.pruebas?.length) payload.pruebas = undefined;

    this.save.emit(payload);
  }
}
