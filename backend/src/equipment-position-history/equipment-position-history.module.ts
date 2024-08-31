import { Module } from '@nestjs/common';
import { EquipmentPositionHistoryService } from './equipment-position-history.service';
import { EquipmentPositionHistoryController } from './equipment-position-history.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentPositionHistory } from './entities/equipment-position-history.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([EquipmentPositionHistory]),
  ],  
  controllers: [EquipmentPositionHistoryController],
  providers: [EquipmentPositionHistoryService],
  exports: [EquipmentPositionHistoryModule, EquipmentPositionHistoryService],
})
export class EquipmentPositionHistoryModule {}
