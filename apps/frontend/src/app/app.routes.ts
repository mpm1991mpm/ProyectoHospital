import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'habitaciones',
    loadComponent: () => import('./pages/habitaciones/habitaciones.component').then(m => m.HabitacionesComponent)
  },
  {
    path: 'pacientes',
    loadComponent: () => import('./pages/pacientes/pacientes.component').then(m => m.PacientesComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
