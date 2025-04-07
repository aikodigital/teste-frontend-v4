import { Component, input, OnInit, signal } from '@angular/core';
import { EquipmentStateHistoryItemComponent } from '../equipment-state-history-item/equipment-state-history-item.component';
import { EquipmentState } from '../../models/EquipmentState';
import {MatPaginatorModule} from '@angular/material/paginator';
@Component({
  selector: 'app-equipment-state-history',
  imports: [EquipmentStateHistoryItemComponent, MatPaginatorModule],
  templateUrl: './equipment-state-history.component.html',
  styleUrl: './equipment-state-history.component.scss'
})
export class EquipmentStateHistoryComponent implements OnInit {
  states = input.required<EquipmentState[]>();
  pageIndex = signal<number>(0);
  pageSize = signal<number>(10);
  currentPageStates = signal<EquipmentState[]>([]);

  ngOnInit(): void {
    this.setCurrentPageStates();
  }

  onPageChange(event: any): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.setCurrentPageStates();
  }

  private setCurrentPageStates(): void {
    this.currentPageStates.set(this.states().slice(this.pageIndex() * this.pageSize(), (this.pageIndex() + 1) * this.pageSize()));
  }
}
