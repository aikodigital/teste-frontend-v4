import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentStateController } from './equipment-state.controller';
import { EquipmentStateService } from './equipment-state.service';

describe('EquipmentStateController', () => {
  let controller: EquipmentStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentStateController],
      providers: [EquipmentStateService],
    }).compile();

    controller = module.get<EquipmentStateController>(EquipmentStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
