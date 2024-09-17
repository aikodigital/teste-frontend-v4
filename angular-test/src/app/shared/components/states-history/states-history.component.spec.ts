import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesHistoryComponent } from './states-history.component';

describe('StatesHistoryComponent', () => {
  let component: StatesHistoryComponent;
  let fixture: ComponentFixture<StatesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatesHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
