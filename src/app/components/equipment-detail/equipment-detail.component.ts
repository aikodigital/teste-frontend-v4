import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';

interface State {
  date: string;
  equipmentStateId: string;
}

@Component({
  selector: 'app-equipment-detail',
  standalone: true,
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.scss'],
  imports: [CommonModule]
})
export class EquipmentDetailComponent implements OnInit {
  equipmentId: string | null = null;
  equipment: any = null;
  stateHistory: State[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    this.equipmentId = this.route.snapshot.paramMap.get('id');
    if (this.equipmentId) {
      this.loadEquipmentData();
      this.loadStateHistory();
    }
  }

  private loadEquipmentData(): void {
    this.dataService.equipmentsSignal.subscribe(data => {
      this.equipment = data.find(e => e.id === this.equipmentId);
    });
  }

  private loadStateHistory(): void {
    this.dataService.equipmentStateHistorySignal.subscribe(data => {
      const equipmentHistory = data.find(h => h.equipmentId === this.equipmentId);
      if (equipmentHistory) {
        this.stateHistory = equipmentHistory.states;
      }
    });
  }
}
