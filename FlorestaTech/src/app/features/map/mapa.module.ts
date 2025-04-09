import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapaComponent } from './mapa/mapa.component';
import { MapaRoutingModule } from './mapa-routing.module';
import { FormsModule } from '@angular/forms';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [MapaComponent, RelatoriosComponent],
  imports: [CommonModule, MapaRoutingModule, FormsModule, NgxPaginationModule],
})
export class MapaModule {}
