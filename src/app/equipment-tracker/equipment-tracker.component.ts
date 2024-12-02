import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { EquipmentMapComponent } from './ui/equipment-map/equipment-map.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EquipmentService } from '../../services/equipment.service';
import { Equipment } from '../../models/equipment';
import { EquipmentPositionHistoryService } from '../../services/equipment-position-history.service';
import { EquipmentModelService } from '../../services/equipment-model.service';
import { EquipmentStateHistoryService } from '../../services/equipment-state-history.service';
import { StateService } from '../../services/state.service';
import { EquipmentState } from '../../models/equipment-state';
import { EquipmentHistoryComponent } from './ui/equipment-history/equipment-history.component';
import { forkJoin, switchMap, map } from 'rxjs';

@Component({
  selector: 'app-equipment-tracker',
  standalone: true,
  imports: [EquipmentMapComponent, CommonModule, EquipmentHistoryComponent],
  templateUrl: './equipment-tracker.component.html',
  styleUrl: './equipment-tracker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    EquipmentService,
    EquipmentPositionHistoryService,
    EquipmentModelService,
    EquipmentStateHistoryService,
    StateService,
  ],
})
export class EquipmentTrackerComponent {
  equipments: WritableSignal<Equipment[]> = signal<Equipment[]>([]);

  equipment: Equipment;

  constructor(
    private activatedRoute: ActivatedRoute,
    private equipmentService: EquipmentService,
    private equipmentPositionHistoryService: EquipmentPositionHistoryService,
    private equipmentModelService: EquipmentModelService,
    private equipmentStateHistoryService: EquipmentStateHistoryService,
    private stateService: StateService
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
    forkJoin({
      equipments: this.equipmentService.listByIds(ids),
      positionHistories: this.equipmentPositionHistoryService.findEquipmentsByIds(ids),
      stateHistories: this.equipmentStateHistoryService.listByEquipmentIds(ids),
    })
      .pipe(
        switchMap(({ equipments, positionHistories, stateHistories }) => {
          const modelIds = equipments.map((equipment) => equipment.equipmentModelId);
          const stateIds = stateHistories.flatMap((history) => history.states.map((state) => state.equipmentStateId));

          return forkJoin({
            equipmentModels: this.equipmentModelService.listModelsByEquipmentIds(modelIds),
            states: this.stateService.listByIds(stateIds),
          }).pipe(
            map(({ equipmentModels, states }) => {
              return equipments.map((equipment) => {
                const positionHistory = positionHistories.find((history) => history.equipmentId === equipment.id);
                const model = equipmentModels.find((model) => model.id === equipment.equipmentModelId);
                const stateHistory = stateHistories.find((history) => history.equipmentId === equipment.id);

                const equipmentStates = stateHistory?.states.map((state) => ({
                  ...state,
                  state: states.find((stateResponse) => state.equipmentStateId === stateResponse.id),
                })) as EquipmentState[];

                return {
                  ...equipment,
                  positions: positionHistory?.positions,
                  equipmentModel: model,
                  states: equipmentStates,
                };
              });
            })
          );
        })
      )
      .subscribe({
        next: (equipments) => {
          this.equipments.set(equipments);
        },
        error: () => {
          this.equipments.set([]);
        },
      });
  }
}
