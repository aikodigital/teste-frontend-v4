import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentStateHistoryController } from './equipment-state-history.controller';
import { EquipmentStateHistoryService } from './equipment-state-history.service';

describe('EquipmentStateHistoryController', () => {
  let controller: EquipmentStateHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentStateHistoryController],
      providers: [EquipmentStateHistoryService],
    }).compile();

    controller = module.get<EquipmentStateHistoryController>(EquipmentStateHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
