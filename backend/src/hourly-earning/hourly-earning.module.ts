import { Module } from '@nestjs/common';
import { HourlyEarningService } from './hourly-earning.service';
import { HourlyEarningController } from './hourly-earning.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HourlyEarnings } from './entities/hourly-earning.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      HourlyEarnings,
    ]),
  ],  
  controllers: [HourlyEarningController],
  providers: [HourlyEarningService],
  exports: [HourlyEarningModule, HourlyEarningService],
})
export class HourlyEarningModule {}
