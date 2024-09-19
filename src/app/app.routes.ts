// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentListComponent } from './components/equipment-list/equipment-list.component';
import { MapComponent } from './components/map/map.component';
import { EquipmentDetailComponent } from './components/equipment-detail/equipment-detail.component';
// Importe outros componentes conforme necessário

export const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'map', component: MapComponent },
  { path: 'equipment', component: EquipmentListComponent },
  { path: 'equipment/:id', component: EquipmentDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
