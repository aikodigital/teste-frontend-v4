import { Module } from '@nestjs/common';
import { EquipmentModelService } from './equipment-model.service';
import { EquipmentModelController } from './equipment-model.controller';
import { EquipmentModel, EquipmentModelSchema } from './entities/equipment-model.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[ 
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{
      name: EquipmentModel.name,
      schema: EquipmentModelSchema,
    }]),
  ],
  controllers: [EquipmentModelController],
  providers: [EquipmentModelService],
  exports: [EquipmentModelModule, EquipmentModelService],
})
export class EquipmentModelModule {}
