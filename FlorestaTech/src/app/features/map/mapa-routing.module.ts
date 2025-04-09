import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './mapa/mapa.component';

const routes: Routes = [
  {
    path: '',
    component: MapaComponent,
    title: 'FlorestaTech - Página inicial',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaRoutingModule {}
