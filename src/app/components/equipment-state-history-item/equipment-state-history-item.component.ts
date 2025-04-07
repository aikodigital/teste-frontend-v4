import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { EquipmentState } from '../../models/EquipmentState';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-equipment-state-history-item',
  imports: [MatCardModule, DatePipe],
  templateUrl: './equipment-state-history-item.component.html',
  styleUrl: './equipment-state-history-item.component.scss'
})
export class EquipmentStateHistoryItemComponent {
 state = input.required<EquipmentState>();
}
