import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose'; 
import { EquipmentState } from 'src/equipment-state/entities/equipment-state.entity';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
 

@Schema()
export class EquipmentStateHistory extends Document {
    @Prop({ type: Types.ObjectId, ref: Equipment.name })
    equipment: Equipment;

    @Prop({ type: [{ date: Date, equipmentState: Object }] })
    states: { date: Date; equipmentState: EquipmentState }[];
}

export const EquipmentStateHistorySchema = SchemaFactory.createForClass(EquipmentStateHistory);
