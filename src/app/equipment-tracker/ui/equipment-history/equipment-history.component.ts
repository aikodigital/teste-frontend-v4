import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { EquipmentBottomComponent } from '../../../../components/equipment-bottom/equipment-bottom.component';
import { Equipment } from '../../../../models/equipment';
import { CircleOff, LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { EquipmentPosition } from '../../../../models/equipment-position';
import dayjs from 'dayjs';

@Component({
  selector: 'app-equipment-history',
  standalone: true,
  imports: [EquipmentBottomComponent, EquipmentBottomComponent, LucideAngularModule, CommonModule],
  templateUrl: './equipment-history.component.html',
  styleUrl: './equipment-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentHistoryComponent {
  equipment: InputSignal<Equipment> = input<Equipment>({} as Equipment);

  icons = {
    empty: CircleOff,
  };

  getEquipmentPositionDescrescent(positions: EquipmentPosition[]): EquipmentPosition[] {
    return positions.sort((a, b) => {
      return dayjs(b.date).unix() - dayjs(a.date).unix();
    });
  }
}
