import { EquipmentModel } from 'src/equipment-model/entities/equipment-model.entity';
import { EquipmentPositionHistory } from 'src/equipment-position-history/entities/equipment-position-history.entity';
import { EquipmentStateHistory } from 'src/equipment-state-history/entities/equipment-state-history.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'; 

@Entity()
export class Equipment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => EquipmentModel, (equipmentModel) => equipmentModel.equipments)
    equipmentModel: EquipmentModel;

    @OneToMany(() => EquipmentPositionHistory, (positionHistory) => positionHistory.equipment)
    positionHistories: EquipmentPositionHistory[];

    @OneToMany(() => EquipmentStateHistory, (stateHistory) => stateHistory.equipment)
    stateHistories: EquipmentStateHistory[];
}
