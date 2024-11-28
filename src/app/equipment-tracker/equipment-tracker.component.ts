import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { EquipmentMapComponent } from './ui/equipment-map/equipment-map.component';
import { ActivatedRoute } from '@angular/router';
import { EquipmentPositionHistoryService } from '../../services/equipment-position-history.service';
import { EquipmentPositionHistory } from '../../models/equipment-position-history';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipment-tracker',
  standalone: true,
  imports: [EquipmentMapComponent, CommonModule],
  templateUrl: './equipment-tracker.component.html',
  styleUrl: './equipment-tracker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EquipmentPositionHistoryService],
})
export class EquipmentTrackerComponent implements OnInit {
  equipment: WritableSignal<EquipmentPositionHistory | undefined> = signal<EquipmentPositionHistory | undefined>(
    undefined
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private equipmentPositionHistoryService: EquipmentPositionHistoryService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['equipment']) {
        this.listEquipments(params['equipment']);
      }
    });
  }

  listEquipments(id: string): void {
    this.equipmentPositionHistoryService.findByEquipmentId(id).subscribe((data) => {
      this.equipment.set(data);
    });
  }
}
