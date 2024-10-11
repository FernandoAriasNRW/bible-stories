import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HistorialComponent } from './pages/historial/historial.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta para el componente Home
  { path: '**', redirectTo: '' } // Ruta wildcard para redirigir cualquier ruta no encontrada
];
