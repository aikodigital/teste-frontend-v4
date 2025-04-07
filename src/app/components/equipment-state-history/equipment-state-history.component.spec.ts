import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentStateHistoryComponent } from './equipment-state-history.component';

describe('EquipmentStateHistoryComponent', () => {
  let component: EquipmentStateHistoryComponent;
  let fixture: ComponentFixture<EquipmentStateHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentStateHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentStateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
