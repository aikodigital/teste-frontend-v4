import { Test, TestingModule } from '@nestjs/testing';
import { HourlyEarningController } from './hourly-earning.controller';
import { HourlyEarningService } from './hourly-earning.service';

describe('HourlyEarningController', () => {
  let controller: HourlyEarningController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HourlyEarningController],
      providers: [HourlyEarningService],
    }).compile();

    controller = module.get<HourlyEarningController>(HourlyEarningController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
