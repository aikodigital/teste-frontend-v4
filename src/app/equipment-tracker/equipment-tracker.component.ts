import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EquipmentMapComponent } from '../../components/equipment-map/equipment-map.component';

@Component({
  selector: 'app-equipment-tracker',
  standalone: true,
  imports: [EquipmentMapComponent],
  templateUrl: './equipment-tracker.component.html',
  styleUrl: './equipment-tracker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentTrackerComponent {}
