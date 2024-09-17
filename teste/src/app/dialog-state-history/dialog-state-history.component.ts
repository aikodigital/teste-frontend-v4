import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'dialog-state-history',
    templateUrl: './dialog-state-history.component.html',
    styleUrls: ['./dialog-state-history.component.scss'],
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, MatTableModule, CommonModule],
  })
  export class DialogStateHistoryComponent {
    dataSourceState = new MatTableDataSource<any>([]);
    dataSourcePosition = new MatTableDataSource<any>([]);
    displayedColumnsState: string[] = ['date', 'stateName'];
    displayedColumnsPosition: string[] = ['date', 'lat', 'lon'];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any
    ){

    }

    ngOnInit() {
        this.dataSourceState.data = this.data.states;
        this.dataSourcePosition.data = this.data.positions;
    }

  }