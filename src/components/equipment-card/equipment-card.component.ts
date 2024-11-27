import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, InputSignal } from '@angular/core';
import clsx from 'clsx';

@Component({
  selector: 'app-equipment-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipment-card.component.html',
  styleUrl: './equipment-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentCardComponent {
  name: InputSignal<string> = input<string>('');
  model: InputSignal<string> = input<string>('');
  image: InputSignal<string> = input<string>('');
  state: InputSignal<string> = input<string>('');
  stateColor: InputSignal<string> = input<string>('');
}
