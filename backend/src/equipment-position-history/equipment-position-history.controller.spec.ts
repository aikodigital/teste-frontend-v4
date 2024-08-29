import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentPositionHistoryController } from './equipment-position-history.controller';
import { EquipmentPositionHistoryService } from './equipment-position-history.service';

describe('EquipmentPositionHistoryController', () => {
  let controller: EquipmentPositionHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentPositionHistoryController],
      providers: [EquipmentPositionHistoryService],
    }).compile();

    controller = module.get<EquipmentPositionHistoryController>(EquipmentPositionHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
