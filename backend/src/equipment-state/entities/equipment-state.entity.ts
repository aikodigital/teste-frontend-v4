import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'; 
import { EquipmentStateHistory } from '../../equipment-state-history/entities/equipment-state-history.entity';
import { HourlyEarning } from '../../hourly-earning/entities/hourly-earning.entity';

@Entity()
export class EquipmentState {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    color: string;

    @OneToMany(() => HourlyEarning, (hourlyEarning) => hourlyEarning.equipmentState)
    hourlyEarnings: HourlyEarning[];

    @OneToMany(() => EquipmentStateHistory, (stateHistory) => stateHistory.equipmentState)
    stateHistories: EquipmentStateHistory[];
}
