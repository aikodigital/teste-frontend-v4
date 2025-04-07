import { Component, inject, OnInit } from '@angular/core';
import { Equipment } from '../../models/Equipment';
import { EquipmentsService } from '../../services/equipments.service';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-equipments-list',
  imports: [MatCardModule, RouterLink],
  standalone: true,
  templateUrl: './equipments-list.component.html',
  styleUrl: './equipments-list.component.scss'
})
export class EquipmentsListComponent implements OnInit {
  
  equipmentsService = inject(EquipmentsService);
  equipments: Equipment[] = []

  ngOnInit(): void {
    this.equipments = this.equipmentsService.getEquipments();
  }
}
