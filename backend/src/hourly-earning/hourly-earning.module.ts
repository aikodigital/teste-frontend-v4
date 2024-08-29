import { Module } from '@nestjs/common';
import { HourlyEarningService } from './hourly-earning.service';
import { HourlyEarningController } from './hourly-earning.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HourlyEarning } from './entities/hourly-earning.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      HourlyEarning,
    ]),
  ],  
  controllers: [HourlyEarningController],
  providers: [HourlyEarningService],
  exports: [HourlyEarningService],
})
export class HourlyEarningModule {}
