import { Module } from '@nestjs/common';
import { EquipmentModelService } from './equipment-model.service';
import { EquipmentModelController } from './equipment-model.controller';
import { EquipmentModel } from './entities/equipment-model.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[ 
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([EquipmentModel]),
  ],
  controllers: [EquipmentModelController],
  providers: [EquipmentModelService],
  exports: [EquipmentModelModule, EquipmentModelService],
})
export class EquipmentModelModule {}
