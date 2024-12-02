import { ChangeDetectionStrategy, Component, output, OutputEmitterRef } from '@angular/core';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  searchChange: OutputEmitterRef<string> = output<string>();

  icons = { Search };

  search(event: Event): void {
    const htmlElementRef = event.target as HTMLInputElement;
    this.searchChange.emit(htmlElementRef.value);
  }
}
