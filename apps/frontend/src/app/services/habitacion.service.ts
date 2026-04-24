import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Habitacion } from '../models/habitacion.model';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/habitaciones';

  habitaciones = signal<Habitacion[]>([]);
  loading = signal(false);

  getAll(): Observable<Habitacion[]> {
    this.loading.set(true);
    return this.http.get<Habitacion[]>(this.apiUrl).pipe(
      tap(data => {
        this.habitaciones.set(data);
        this.loading.set(false);
      })
    );
  }

  getById(id: number): Observable<Habitacion> {
    return this.http.get<Habitacion>(`${this.apiUrl}/${id}`);
  }

  create(habitacion: Habitacion): Observable<Habitacion> {
    return this.http.post<Habitacion>(this.apiUrl, habitacion).pipe(
      tap(() => this.getAll().subscribe())
    );
  }

  update(id: number, habitacion: Habitacion): Observable<Habitacion> {
    return this.http.put<Habitacion>(`${this.apiUrl}/${id}`, habitacion).pipe(
      tap(() => this.getAll().subscribe())
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.getAll().subscribe())
    );
  }
}
