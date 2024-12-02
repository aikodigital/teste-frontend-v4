import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, InputSignal } from '@angular/core';
import { clsx } from 'clsx';
import { EquipmentBottomComponent } from '../equipment-bottom/equipment-bottom.component';

@Component({
  selector: 'app-equipment-card',
  standalone: true,
  imports: [CommonModule, EquipmentBottomComponent],
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
  selected: InputSignal<boolean> = input<boolean>(false);

  computedSelected = computed(() => {
    return clsx(
      'relative py-4 px-6 w-full hover:bg-gray-200 flex items-center gap-4  border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700',
      this.selected() ? 'bg-gray-200' : 'bg-white'
    );
  });

  get getSelectedStateClass(): string {
    return this.computedSelected();
  }
}
