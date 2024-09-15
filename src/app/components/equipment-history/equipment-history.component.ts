import { Component, Input } from '@angular/core';
import { MapService } from '../../services/map/map.service';

@Component({
  selector: 'app-equipment-history',
  standalone: true,
  imports: [],
  templateUrl: './equipment-history.component.html',
  styleUrl: './equipment-history.component.css'
})
export class EquipmentHistoryComponent {
  isSidebarOpen: boolean = true;
  @Input() equipment: any;

  constructor(private mapService: MapService) { }

  closeSidebar() {
    this.mapService.closeSidebar();
  }

  get isOpenClass(): string {
    return this.isSidebarOpen ? 'open' : '';
  }
}
