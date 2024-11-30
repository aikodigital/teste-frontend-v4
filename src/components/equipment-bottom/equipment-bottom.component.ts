import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-equipment-bottom',
  standalone: true,
  imports: [],
  templateUrl: './equipment-bottom.component.html',
  styleUrl: './equipment-bottom.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentBottomComponent {
  image: InputSignal<string> = input<string>('');
}
