import { Module } from '@nestjs/common';
import { EquipmentPositionHistoryService } from './equipment-position-history.service';
import { EquipmentPositionHistoryController } from './equipment-position-history.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentPositionHistory, EquipmentPositionHistorySchema } from './entities/equipment-position-history.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{
      name: EquipmentPositionHistory.name,
      schema: EquipmentPositionHistorySchema,
    }]),
  ],  
  controllers: [EquipmentPositionHistoryController],
  providers: [EquipmentPositionHistoryService],
  exports: [EquipmentPositionHistoryModule, EquipmentPositionHistoryService],
})
export class EquipmentPositionHistoryModule {}
