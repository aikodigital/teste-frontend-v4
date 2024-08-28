import { Component, inject, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import * as heroIcons from '@ng-icons/heroicons/outline';
import { EquipmentService } from '../../services/equipment/equipment.service';
import { IEquipmentState } from '../../interfaces/iEquipmentState';
import { ICustomEquipment } from '../../interfaces/iCustomEquipment';

enum EquipmentState {
  OPERATING = 'Operando',
  STOPPED = 'Parado',
  MAINTENANCE = 'Manutenção',
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons(heroIcons)],

  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent implements OnInit {
  private equipmentService = inject(EquipmentService);

  equipmentStateHistory: IEquipmentState[] = [];
  equipment: ICustomEquipment | undefined = undefined;

  ngOnInit(): void {
    this.equipmentService.equipmentStateHistory.subscribe((response) => {
      this.equipmentStateHistory = response.stateHistory;
      this.equipment = response.equipmentInfo;
      console.log(this.equipment);
    });
  }

  getIconName(equipmentState: IEquipmentState): string {
    switch (equipmentState.name) {
      case EquipmentState.OPERATING:
        return 'heroCheckBadge';
      case EquipmentState.STOPPED:
        return 'heroXCircle';
      case EquipmentState.MAINTENANCE:
        return 'heroWrench';
      default:
        return 'heroCheckBadge';
    }
  }
}
