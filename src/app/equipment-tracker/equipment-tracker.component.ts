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

@Component({
  selector: 'app-equipment-tracker',
  standalone: true,
  imports: [EquipmentMapComponent, CommonModule],
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
  equipments: WritableSignal<Equipment[] | undefined> = signal<Equipment[] | undefined>(undefined);

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
    this.equipmentService.listByIds(ids).subscribe((equipmentsResponse) => {
      this.equipmentPositionHistoryService.findEquipmentsByIds(ids).subscribe((positionHistoryResponse) => {
        this.equipmentStateHistoryService.listByEquipmentIds(ids).subscribe((stateHistoryResponse) => {
          this.equipmentModelService
            .listModelsByEquipmentIds(equipmentsResponse.map((equipment) => equipment.equipmentModelId))
            .subscribe((equipmentModels) => {
              const states = stateHistoryResponse.flatMap((state) =>
                state.states.map((state) => state.equipmentStateId)
              );

              this.stateService.listByIds(states).subscribe((stateResponse) => {
                const equipments = equipmentsResponse.map((equipment) => {
                  const positionHistory = positionHistoryResponse.find(
                    (history) => history.equipmentId === equipment.id
                  );
                  const model = equipmentModels.find((model) => model.id === equipment.equipmentModelId);
                  const stateHistory = stateHistoryResponse.find((state) => state.equipmentId === equipment.id);
                  const states = stateHistory?.states.map((state) => {
                    const currentState = stateResponse.find(
                      (stateResponse) => state.equipmentStateId === stateResponse.id
                    );

                    return {
                      ...state,
                      state: currentState,
                    } as EquipmentState;
                  });

                  return (equipment = {
                    ...equipment,
                    positions: positionHistory?.positions,
                    equipmentModel: model,
                    states: states,
                  });
                });

                this.equipments.set(equipments);
              });
            });
        });
      });
    });
  }
}
