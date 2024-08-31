import { Module } from '@nestjs/common';
import { EquipmentStateHistoryService } from './equipment-state-history.service';
import { EquipmentStateHistoryController } from './equipment-state-history.controller';
import { ConfigModule } from '@nestjs/config';
import { EquipmentStateHistory } from './entities/equipment-state-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forFeature([EquipmentStateHistory]),
  ],
  controllers: [EquipmentStateHistoryController],
  providers: [EquipmentStateHistoryService],
  exports: [EquipmentStateHistoryModule, EquipmentStateHistoryService],
})
export class EquipmentStateHistoryModule {}
