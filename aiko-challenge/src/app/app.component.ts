import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EquipmentService } from './core/services/equipment/equipment.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'aiko-challenge';
  private eq = inject(EquipmentService);

  ngOnInit(): void {
    // console.log(this.eq.getEquipments());
    console.log(this.eq.getEquipment('a7c53eb1-4f5e-4eba-9764-ad205d0891f9'));
  }
}
