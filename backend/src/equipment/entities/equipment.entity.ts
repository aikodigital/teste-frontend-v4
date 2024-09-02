import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EquipmentModel } from 'src/equipment-model/entities/equipment-model.entity';
import { EquipmentPositionHistory } from 'src/equipment-position-history/entities/equipment-position-history.entity';
import { EquipmentStateHistory } from 'src/equipment-state-history/entities/equipment-state-history.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Document, Types } from 'mongoose';

@Schema()
export class Equipment extends Document {
  @Prop({ type: Types.ObjectId, ref: EquipmentModel.name })
  equipmentModel: Types.ObjectId;

  @Prop()
  name: string;
}


export const EquipmentSchema = SchemaFactory.createForClass(Equipment);