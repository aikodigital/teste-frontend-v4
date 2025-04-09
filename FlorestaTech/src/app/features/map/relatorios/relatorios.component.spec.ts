import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosComponent } from './relatorios.component';

describe('RelatoriosComponent', () => {
  let component: RelatoriosComponent;
  let fixture: ComponentFixture<RelatoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatoriosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
