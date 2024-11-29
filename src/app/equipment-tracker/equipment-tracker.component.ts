import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { EquipmentMapComponent } from './ui/equipment-map/equipment-map.component';
import { ActivatedRoute } from '@angular/router';
import { EquipmentPositionHistoryService } from '../../services/equipment-position-history.service';
import { EquipmentPositionHistory } from '../../models/equipment-position-history';
import { CommonModule } from '@angular/common';
import { forkJoin, mergeMap, of } from 'rxjs';
import { EquipmentService } from '../../services/equipment.service';
import { Equipment } from '../../models/equipment';

interface IEquipmentDataType {
  equipmentHistory: EquipmentPositionHistory | undefined;
  equipment: Equipment | undefined;
}

@Component({
  selector: 'app-equipment-tracker',
  standalone: true,
  imports: [EquipmentMapComponent, CommonModule],
  templateUrl: './equipment-tracker.component.html',
  styleUrl: './equipment-tracker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EquipmentPositionHistoryService, EquipmentService],
})
export class EquipmentTrackerComponent implements OnInit {
  equipment: WritableSignal<IEquipmentDataType | undefined> = signal<IEquipmentDataType | undefined>(undefined);

  constructor(
    private activatedRoute: ActivatedRoute,
    private equipmentPositionHistoryService: EquipmentPositionHistoryService,
    private equipmentService: EquipmentService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['equipment']) {
        this.listEquipments(params['equipment']);
      }
    });
  }

  listEquipments(id: string): void {
    this.equipmentPositionHistoryService
      .findByEquipmentId(id)
      .pipe(
        mergeMap((equipment) => {
          return forkJoin({
            equipmentHistory: of(equipment),
            equipment: this.equipmentService.find(equipment?.equipmentId || ''),
          });
        })
      )
      .subscribe((data) => {
        this.equipment.set({
          equipmentHistory: data.equipmentHistory,
          equipment: data.equipment,
        });
      });
  }
}
