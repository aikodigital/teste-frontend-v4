import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Redirecionamento inicial para map/tracking equipment
  {
    path: '',
    redirectTo: 'tracking-equipment',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'tracking-equipment', // essa rota vem do MapaRoutingModule
        loadChildren: () =>
          import('./features/map/mapa.module').then((m) => m.MapaModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'tracking-equipment',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
