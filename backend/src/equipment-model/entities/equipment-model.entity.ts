import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { HourlyEarnings } from 'src/hourly-earning/entities/hourly-earning.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
 

@Schema()
export class EquipmentModel extends Document{ 

  @Prop()
  name: string;

  @Prop()  
  hourlyEarnings: HourlyEarnings[];
}

export const EquipmentModelSchema = SchemaFactory.createForClass(EquipmentModel);

