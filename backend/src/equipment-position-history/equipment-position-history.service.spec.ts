import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentPositionHistoryService } from './equipment-position-history.service';

describe('EquipmentPositionHistoryService', () => {
  let service: EquipmentPositionHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipmentPositionHistoryService],
    }).compile();

    service = module.get<EquipmentPositionHistoryService>(EquipmentPositionHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
