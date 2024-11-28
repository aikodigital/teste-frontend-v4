import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EquipmentMapComponent } from '../../components/equipment-map/equipment-map.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-equipment-tracker',
  standalone: true,
  imports: [EquipmentMapComponent],
  templateUrl: './equipment-tracker.component.html',
  styleUrl: './equipment-tracker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentTrackerComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params['equipment']);
    });
  }
}
