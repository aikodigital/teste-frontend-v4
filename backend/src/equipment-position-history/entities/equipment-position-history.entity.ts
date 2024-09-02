import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
 

@Schema()
export class EquipmentPositionHistory extends Document {

  @Prop()
  equipment: Equipment;

  @Prop({ type: [{ date: Date, lat: Number, lon: Number }] })
  positions: { date: Date; lat: number; lon: number }[];
}


export const EquipmentPositionHistorySchema = SchemaFactory.createForClass(EquipmentPositionHistory);