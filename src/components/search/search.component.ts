import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  icons = { Search };
}
