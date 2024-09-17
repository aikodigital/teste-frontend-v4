import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MapService } from '../../services/map/map.service';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipment-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipment-history.component.html',
  styleUrl: './equipment-history.component.css'
})
export class EquipmentHistoryComponent implements OnChanges {
  @Input() equipment: any;

  statesHistory: any;
  isSidebarOpen: boolean = true;

  constructor(
    private mapService: MapService,
    private equipmentService: EquipmentService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['equipment'] && changes['equipment'].currentValue) {
      this.loadEquipmentHistory();
    }
  }

  loadEquipmentHistory() {
    this.statesHistory = this.equipmentService.getStateHistoryByEquipmentId(this.equipment.equipmentId);
  }

  closeSidebar() {
    this.mapService.closeSidebar();
  }

  formatDate(dateString: string): string {
    if (!dateString) {
      return '';
    }
    const data = new Date(dateString);

    if (isNaN(data.getTime())) {
      return '';
    }

    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    const ano = data.getUTCFullYear();
    const horas = String(data.getUTCHours()).padStart(2, '0');
    const minutos = String(data.getUTCMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
  }
}
