import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'; 
import { Equipment } from '../../equipment/entities/equipment.entity';
import { EquipmentState } from '../../equipment-state/entities/equipment-state.entity';

@Entity()
export class EquipmentStateHistory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('timestamp')
    date: Date;

    @ManyToOne(() => Equipment, (equipment) => equipment.stateHistories)
    equipment: Equipment;

    @ManyToOne(() => EquipmentState, (equipmentState) => equipmentState.stateHistories)
    equipmentState: EquipmentState;
}
