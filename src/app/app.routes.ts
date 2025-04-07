import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component')
      .then(m => m.HomeComponent)
  },
  {
    path: 'equipments/:id',
    loadComponent: () => import('./pages/equipment/equipment.component')
      .then(m => m.EquipmentComponent)
  }
];
