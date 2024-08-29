import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentModelService } from './equipment-model.service';

describe('EquipmentModelService', () => {
  let service: EquipmentModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipmentModelService],
    }).compile();

    service = module.get<EquipmentModelService>(EquipmentModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
