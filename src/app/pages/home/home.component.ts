import { Component } from '@angular/core';
import { EquipmentsListComponent } from '../../components/equipments-list/equipments-list.component';

@Component({
  selector: 'app-home',
  imports: [EquipmentsListComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
