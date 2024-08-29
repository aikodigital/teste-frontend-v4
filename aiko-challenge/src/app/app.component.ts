import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EquipmentService } from './core/services/equipment/equipment.service';
import { MapComponent } from './core/components/map/map.component';
import { ICustomEquipment } from './core/interfaces/iCustomEquipment';
import { HeaderComponent } from './core/shared/header/header.component';
import { TimelineComponent } from './core/components/timeline/timeline.component';
import { IEquipment } from './core/interfaces/iEquipment';
import { IHourlyEarning } from './core/interfaces/iHourlyEarning';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent, HeaderComponent, TimelineComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private equipmentService = inject(EquipmentService);

  equipmentList: ICustomEquipment[] = [];

  ngOnInit(): void {
    this.loadEquipmentPositions();
  }

  private loadEquipmentPositions(): void {
    const equipments = this.equipmentService.getEquipments();

    this.equipmentList = equipments.map((equipment: IEquipment) => {
      const latestPosition = this.equipmentService.getEquipmentLatestPosition(
        equipment.id
      );
      const model = this.equipmentService.getEquipmentModel(
        equipment.equipmentModelId
      );

      const updatedHourlyEarnings =
        model?.hourlyEarnings.map((earning: IHourlyEarning) => ({
          ...earning,
          status: this.equipmentService.getEquipmentState(
            earning.equipmentStateId
          ),
        })) || [];

      const equipmentStateHistory =
        this.equipmentService.getEquipmentStateHistory(equipment.id);

      const stateList = equipmentStateHistory?.states.map((item) =>
        this.equipmentService.getEquipmentState(item.equipmentStateId)
      );

      return {
        ...equipment,
        latestPosition,
        stateList,
        model: model
          ? { ...model, hourlyEarnings: updatedHourlyEarnings }
          : null,
      };
    }) as ICustomEquipment[];

    this.equipmentService.equipments.next(this.equipmentList);
  }
}
