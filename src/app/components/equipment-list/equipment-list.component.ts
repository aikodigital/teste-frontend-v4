import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Equipment } from '../../models/equipment';

@Component({
  selector: 'app-equipment-list',
  standalone: true,
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss'],
  imports: [CommonModule]
})
export class EquipmentListComponent implements OnInit {
  equipments: Equipment[] = [];

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.equipmentsSignal.subscribe(data => {
      this.equipments = data;
    });
  }

  navigateToDetails(id: string): void {
    this.router.navigate(['/equipment', id]);
  }
}
