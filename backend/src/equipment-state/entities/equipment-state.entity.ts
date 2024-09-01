import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import e from 'express';
import { Document } from 'mongoose';
import { EquipmentStateHistory } from 'src/equipment-state-history/entities/equipment-state-history.entity';
import { HourlyEarnings } from 'src/hourly-earning/entities/hourly-earning.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'; 

@Schema()
export class EquipmentState extends Document {  
  @Prop()
  name: string;

  @Prop()
  color: string;
}

export const EquipmentStateSchema = SchemaFactory.createForClass(EquipmentState);