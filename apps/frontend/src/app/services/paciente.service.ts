import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Paciente } from '../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/pacientes';

  pacientes = signal<Paciente[]>([]);
  loading = signal(false);

  getAll(): Observable<Paciente[]> {
    this.loading.set(true);
    return this.http.get<Paciente[]>(this.apiUrl).pipe(
      tap({
        next: (data) => {
          this.pacientes.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        }
      })
    );
  }

  getById(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
  }

  getByHabitacion(habitacionId: number): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}/habitacion/${habitacionId}`);
  }

  create(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, paciente).pipe(
      tap(() => this.getAll().subscribe())
    );
  }

  update(id: number, paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/${id}`, paciente).pipe(
      tap(() => this.getAll().subscribe())
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.getAll().subscribe())
    );
  }
}
