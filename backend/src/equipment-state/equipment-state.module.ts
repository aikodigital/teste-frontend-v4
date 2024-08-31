import { Module } from '@nestjs/common';
import { EquipmentStateService } from './equipment-state.service';
import { EquipmentStateController } from './equipment-state.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentState } from './entities/equipment-state.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([EquipmentState]),
  ],
  controllers: [EquipmentStateController],
  providers: [EquipmentStateService],
  exports: [EquipmentStateModule, EquipmentStateService],
})
export class EquipmentStateModule {}
