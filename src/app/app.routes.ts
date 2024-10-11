import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { ShowCardsComponent } from './components/showCards/show-cards.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cards', component: ShowCardsComponent}, // Ruta para el componente Home
  { path: '**', redirectTo: '' } // Ruta wildcard para redirigir cualquier ruta no encontrada
];
