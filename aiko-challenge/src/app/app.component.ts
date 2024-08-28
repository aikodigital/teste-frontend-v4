import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EquipmentService } from './core/services/equipment/equipment.service';
import { MapComponent } from './core/components/map/map.component';
import { IPosition } from './core/interfaces/iPosition';
import { IEquipmentState } from './core/interfaces/iEquipmentState';
import { ICustomEquipment } from './core/interfaces/iCustomEquipment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapComponent],
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

    this.equipmentList = equipments.map((equipment: any) => {
      const latestPosition = this.equipmentService.getEquipmentLatestPosition(
        equipment.id
      );
      const model = this.equipmentService.getEquipmentModel(
        equipment.equipmentModelId
      );

      const updatedHourlyEarnings =
        model?.hourlyEarnings.map((earning: any) => ({
          ...earning,
          status: this.equipmentService.getEquipmentState(
            earning.equipmentStateId
          ),
        })) || [];

      return {
        ...equipment,
        latestPosition,
        model: model
          ? { ...model, hourlyEarnings: updatedHourlyEarnings }
          : null,
      };
    });

    this.equipmentService.positions.next(this.equipmentList);
  }
}
