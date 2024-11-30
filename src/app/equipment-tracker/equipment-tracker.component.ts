import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { EquipmentMapComponent } from './ui/equipment-map/equipment-map.component';
import { ActivatedRoute } from '@angular/router';
import { EquipmentPositionHistoryService } from '../../services/equipment-position-history.service';
import { EquipmentPositionHistory } from '../../models/equipment-position-history';
import { CommonModule } from '@angular/common';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'app-equipment-tracker',
  standalone: true,
  imports: [EquipmentMapComponent, CommonModule],
  templateUrl: './equipment-tracker.component.html',
  styleUrl: './equipment-tracker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EquipmentPositionHistoryService, EquipmentService],
})
export class EquipmentTrackerComponent {
  equipments: WritableSignal<EquipmentPositionHistory[] | undefined> = signal<EquipmentPositionHistory[] | undefined>(
    undefined
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private equipmentPositionHistoryService: EquipmentPositionHistoryService
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const equipments = params.getAll('equipments');

      if (equipments?.length) {
        this.listEquipments(equipments);
      } else {
        this.equipments.set([]);
      }
    });
  }

  listEquipments(ids: string[]): void {
    this.equipmentPositionHistoryService.findEquipmentsByIds(ids).subscribe((data) => {
      this.equipments.set(data);
    });
  }
}
