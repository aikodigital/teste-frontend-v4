import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentStateHistoryService } from './equipment-state-history.service';

describe('EquipmentStateHistoryService', () => {
  let service: EquipmentStateHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipmentStateHistoryService],
    }).compile();

    service = module.get<EquipmentStateHistoryService>(EquipmentStateHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
