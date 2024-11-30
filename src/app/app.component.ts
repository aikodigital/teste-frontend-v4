import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { LucideAngularModule, Search } from 'lucide-angular';
import { EquipmentService } from '../services/equipment.service';
import { EquipmentCardComponent } from '../components/equipment-card/equipment-card.component';
import { forkJoin, map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { Equipment } from '../models/equipment';
import { EquipmentModelService } from '../services/equipment-model.service';
import { EquipmentStateHistoryService } from '../services/equipment-state-history.service';
import { EquipmentModel } from '../models/equipment-model';
import { EquipmentStateHistory } from '../models/equipment-state-history';
import { StateService } from '../services/state.service';
import { State } from '../models/state';

interface DataType {
  equipment: Equipment;
  state: EquipmentStateHistory | undefined;
  model: EquipmentModel | undefined;
  currentState?: State;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, LucideAngularModule, EquipmentCardComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [EquipmentService, EquipmentModelService, EquipmentStateHistoryService, StateService],
})
export class AppComponent implements OnInit {
  icons = { Search };

  data$: Observable<DataType[]>;

  selectedEquipments: string[] = [];

  constructor(
    private equipmentService: EquipmentService,
    private equipmentModelService: EquipmentModelService,
    private equipmentStateHistoryService: EquipmentStateHistoryService,
    private stateService: StateService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
    this.data$ = this.equipmentService.list().pipe(
      mergeMap((equipments) => {
        return forkJoin(
          equipments.map((equipment) =>
            forkJoin({
              equipment: of(equipment),
              state: this.equipmentStateHistoryService.findByEquipmentId(equipment.id),
              model: this.equipmentModelService.find(equipment.equipmentModelId),
            }).pipe(
              switchMap(({ equipment, state, model }) => {
                const lastState = state && state?.states[state?.states.length - 1];

                if (!lastState) {
                  return of({ equipment, state, model });
                }

                return this.stateService.find(lastState?.equipmentStateId).pipe(
                  map((currentState) => ({
                    equipment,
                    state,
                    model,
                    currentState,
                  }))
                );
              })
            )
          )
        );
      })
    );
  }

  checkEquipmentSelected(id: string): boolean {
    return !!this.selectedEquipments.find((equipment) => equipment === id);
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
