import { Test, TestingModule } from '@nestjs/testing';
import { HourlyEarningService } from './hourly-earning.service';

describe('HourlyEarningService', () => {
  let service: HourlyEarningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HourlyEarningService],
    }).compile();

    service = module.get<HourlyEarningService>(HourlyEarningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
