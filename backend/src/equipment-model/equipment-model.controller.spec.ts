import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentModelController } from './equipment-model.controller';
import { EquipmentModelService } from './equipment-model.service';

describe('EquipmentModelController', () => {
  let controller: EquipmentModelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentModelController],
      providers: [EquipmentModelService],
    }).compile();

    controller = module.get<EquipmentModelController>(EquipmentModelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
