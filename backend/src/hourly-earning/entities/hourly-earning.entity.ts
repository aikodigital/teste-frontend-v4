import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EquipmentModel } from 'src/equipment-model/entities/equipment-model.entity';
import { EquipmentState } from 'src/equipment-state/entities/equipment-state.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Schema()
export class HourlyEarnings extends Document {
  
  @Prop({ type: Types.ObjectId, ref: EquipmentState.name })
  equipmentState: Types.ObjectId;

  @Prop()
  value: number;
}

export const HourlyEarningsSchema = SchemaFactory.createForClass(HourlyEarnings);