import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'equipment-tracker',
    loadChildren: () => import('./equipment-tracker/equipment-tracker.routes').then((m) => m.routes),
  },
];
