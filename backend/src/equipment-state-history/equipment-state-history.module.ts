import { Module } from '@nestjs/common';
import { EquipmentStateHistoryService } from './equipment-state-history.service';
import { EquipmentStateHistoryController } from './equipment-state-history.controller';
import { ConfigModule } from '@nestjs/config';
import { EquipmentStateHistory, EquipmentStateHistorySchema } from './entities/equipment-state-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forFeature([{
      name: EquipmentStateHistory.name,
      schema: EquipmentStateHistorySchema,
    }]),
  ],
  controllers: [EquipmentStateHistoryController],
  providers: [EquipmentStateHistoryService],
  exports: [EquipmentStateHistoryModule, EquipmentStateHistoryService],
})
export class EquipmentStateHistoryModule {}
