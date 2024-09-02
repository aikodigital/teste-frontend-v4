import { Module } from '@nestjs/common';
import { HourlyEarningService } from './hourly-earning.service';
import { HourlyEarningController } from './hourly-earning.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HourlyEarnings, HourlyEarningsSchema } from './entities/hourly-earning.entity';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{
      name: HourlyEarnings.name,
      schema: HourlyEarningsSchema,
    }]),
  ],  
  controllers: [HourlyEarningController],
  providers: [HourlyEarningService],
  exports: [HourlyEarningModule, HourlyEarningService],
})
export class HourlyEarningModule {}
