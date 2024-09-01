import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipment, EquipmentSchema } from './entities/equipment.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{
     name: Equipment.name,
     schema: EquipmentSchema,      
    }]),
  ],
  controllers: [EquipmentController],
  providers: [EquipmentService],
  exports: [EquipmentModule, EquipmentService],
})
export class EquipmentModule {}
