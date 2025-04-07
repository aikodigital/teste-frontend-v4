import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentStateHistoryItemComponent } from './equipment-state-history-item.component';

describe('EquipmentStateHistoryItemComponent', () => {
  let component: EquipmentStateHistoryItemComponent;
  let fixture: ComponentFixture<EquipmentStateHistoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentStateHistoryItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentStateHistoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
