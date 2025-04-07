import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentsListComponent } from './equipments-list.component';

describe('EquipmentsListComponent', () => {
  let component: EquipmentsListComponent;
  let fixture: ComponentFixture<EquipmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
