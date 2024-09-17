import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentHistoryComponent } from './equipment-history.component';

describe('EquipmentHistoryComponent', () => {
  let component: EquipmentHistoryComponent;
  let fixture: ComponentFixture<EquipmentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquipmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
