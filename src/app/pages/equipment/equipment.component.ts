import { Component, inject, OnInit } from '@angular/core';
import { Equipment } from '../../models/Equipment';
import { EquipmentsService } from '../../services/equipments.service';
import { ActivatedRoute } from '@angular/router';
import { MapComponent } from '../../components/map/map.component';
import { EquipmentStateHistoryComponent } from '../../components/equipment-state-history/equipment-state-history.component';

@Component({
  selector: 'app-equipment',
  imports: [MapComponent, EquipmentStateHistoryComponent],
  templateUrl: './equipment.component.html',
  styleUrl: './equipment.component.scss'
})
export class EquipmentComponent implements OnInit {
  equipmentsService = inject(EquipmentsService);
  route = inject(ActivatedRoute)
  equipment!:Equipment;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.equipment = this.equipmentsService.getEquipment(params['id']);
    });
  }
}
