import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentStateService } from './equipment-state.service';

describe('EquipmentStateService', () => {
  let service: EquipmentStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipmentStateService],
    }).compile();

    service = module.get<EquipmentStateService>(EquipmentStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
