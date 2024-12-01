import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { EquipmentService } from '../services/equipment.service';
import { EquipmentCardComponent } from '../components/equipment-card/equipment-card.component';
import { forkJoin, map, switchMap } from 'rxjs';
import { Equipment } from '../models/equipment';
import { EquipmentModelService } from '../services/equipment-model.service';
import { EquipmentStateHistoryService } from '../services/equipment-state-history.service';
import { StateService } from '../services/state.service';
import { SearchComponent } from '../components/search/search.component';
import { EquipmentState } from '../models/equipment-state';
import { EquipmentPositionHistoryService } from '../services/equipment-position-history.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, EquipmentCardComponent, CommonModule, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    EquipmentService,
    EquipmentModelService,
    EquipmentStateHistoryService,
    StateService,
    EquipmentPositionHistoryService,
  ],
})
export class AppComponent implements OnInit {
  equipments: WritableSignal<Equipment[] | undefined> = signal<Equipment[] | undefined>(undefined);

  selectedEquipments: string[] = [];

  constructor(
    private equipmentService: EquipmentService,
    private equipmentModelService: EquipmentModelService,
    private equipmentStateHistoryService: EquipmentStateHistoryService,
    private stateService: StateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private equipmentPositionHistoryService: EquipmentPositionHistoryService
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const equipments = params.getAll('equipments');

      if (equipments?.length) {
        this.selectedEquipments = equipments;
      }
    });
  }

  ngOnInit(): void {
    this.listEquipments();
  }

  listEquipments(): void {
    forkJoin({
      equipments: this.equipmentService.list(),
      positionHistories: this.equipmentPositionHistoryService.list(),
      stateHistories: this.equipmentStateHistoryService.list(),
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
        error: (error) => {
          console.error('Error fetching equipment details', error);
        },
      });
  }

  checkEquipmentSelected(id: string): boolean {
    return !!this.selectedEquipments.find((equipment) => equipment === id);
  }

  getLastEquipmentState(equipment: Equipment): EquipmentState {
    const lastState = equipment.states[equipment.states.length - 1];
    return lastState;
  }

  selectEquipment(id: string): void {
    const equipments = this.selectedEquipments.includes(id)
      ? this.selectedEquipments.filter((equipment) => equipment !== id)
      : [...this.selectedEquipments, id];

    this.selectedEquipments = [];
    this.selectedEquipments = equipments;

    this.navigateTo(equipments);
  }

  async navigateTo(equipments: string[]): Promise<void> {
    if (equipments.length) {
      await this.router.navigate(['equipment-tracker'], {
        queryParams: { equipments },
      });
    } else {
      await this.router.navigate(['equipment-tracker']);
    }
  }
}
