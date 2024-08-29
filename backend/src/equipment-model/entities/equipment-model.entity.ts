import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'; 
import { Equipment } from '../../equipment/entities/equipment.entity';
import { HourlyEarning } from '../../hourly-earning/entities/hourly-earning.entity';

@Entity()
export class EquipmentModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => HourlyEarning, (hourlyEarning) => hourlyEarning.equipmentModel)
    hourlyEarnings: HourlyEarning[];

    @OneToMany(() => Equipment, (equipment) => equipment.equipmentModel)
    equipments: Equipment[];
}
