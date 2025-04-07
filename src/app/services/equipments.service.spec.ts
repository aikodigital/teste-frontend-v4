import { TestBed } from '@angular/core/testing';

import { EquipmentsService } from './equipments.service';

describe('EquipmentsService', () => {
  let service: EquipmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
