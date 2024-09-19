import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { EquipmentListComponent } from './components/equipment-list/equipment-list.component';
import { EquipmentDetailComponent } from './components/equipment-detail/equipment-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: 'map', component: MapComponent },
  { path: 'equipment', component: EquipmentListComponent },
  { path: 'equipment/:id', component: EquipmentDetailComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
