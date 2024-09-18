import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { EquipmentListComponent } from './components/equipment-list/equipment-list.component';
import { EquipmentDetailComponent } from './components/equipment-detail/equipment-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' }, // Redireciona para o mapa
  { path: 'map', component: MapComponent }, // Exibe o mapa
  { path: 'equipment', component: EquipmentListComponent }, // Lista de equipamentos
  { path: 'equipment/:id', component: EquipmentDetailComponent } // Detalhes de um equipamento específico
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
