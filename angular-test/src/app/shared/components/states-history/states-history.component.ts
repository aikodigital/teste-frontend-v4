import { Component, Inject, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-states-history',
  standalone: true,
  imports: [MatDialogTitle, 
            MatDialogContent, 
            MatDialogActions, 
            MatDialogClose, 
            MatButtonModule, 
            MatTableModule, 
            MatSortModule, 
            MatPaginatorModule, 
            DatePipe],
  templateUrl: './states-history.component.html',
  styleUrl: './states-history.component.css'
})
export class StatesHistoryComponent {
  displayedColumns: string[] = ['date', 'state'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
 ) { 
  this.dataSource = new MatTableDataSource(data.states);
 }

 ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

}
