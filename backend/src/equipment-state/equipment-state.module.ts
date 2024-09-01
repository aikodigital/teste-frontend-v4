import { Module } from '@nestjs/common';
import { EquipmentStateService } from './equipment-state.service';
import { EquipmentStateController } from './equipment-state.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentState, EquipmentStateSchema } from './entities/equipment-state.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{
      name: EquipmentState.name,
      schema: EquipmentStateSchema,
    }]),
  ],
  controllers: [EquipmentStateController],
  providers: [EquipmentStateService],
  exports: [EquipmentStateModule, EquipmentStateService],
})
export class EquipmentStateModule {}
