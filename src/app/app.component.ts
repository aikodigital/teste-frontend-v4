import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule, Search } from 'lucide-angular';
import { EquipmentService } from '../services/equipment.service';
import { EquipmentCardComponent } from '../components/equipment-card/equipment-card.component';
import { Observable } from 'rxjs';
import { Equipment } from '../models/equipment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, LucideAngularModule, EquipmentCardComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [EquipmentService],
})
export class AppComponent {
  icons = { Search };

  equipments$: Observable<Equipment[]> = this.equipmentService.listEquipments();

  constructor(private equipmentService: EquipmentService) {}
}
