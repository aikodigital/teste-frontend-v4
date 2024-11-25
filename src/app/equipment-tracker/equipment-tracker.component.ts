import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-equipment-tracker',
  standalone: true,
  imports: [],
  templateUrl: './equipment-tracker.component.html',
  styleUrl: './equipment-tracker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentTrackerComponent {}
