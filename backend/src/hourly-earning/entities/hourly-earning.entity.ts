import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'; 
import { EquipmentState } from '../../equipment-state/entities/equipment-state.entity';
import { EquipmentModel } from '../../equipment-model/entities/equipment-model.entity';

@Entity()
export class HourlyEarning {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal')
    value: number;

    @ManyToOne(() => EquipmentState, (equipmentState) => equipmentState.hourlyEarnings)
    equipmentState: EquipmentState;

    @ManyToOne(() => EquipmentModel, (equipmentModel) => equipmentModel.hourlyEarnings)
    equipmentModel: EquipmentModel;
}
