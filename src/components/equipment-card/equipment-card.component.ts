import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-equipment-card',
  standalone: true,
  imports: [],
  templateUrl: './equipment-card.component.html',
  styleUrl: './equipment-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentCardComponent {
  name: InputSignal<string> = input<string>('');
  model: InputSignal<string> = input<string>('');
  image: InputSignal<string> = input<string>('');
  status: InputSignal<string> = input<string>('');
  lastPosition: InputSignal<string> = input<string>('');
}
