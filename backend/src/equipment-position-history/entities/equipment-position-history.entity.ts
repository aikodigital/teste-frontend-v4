import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'; 
import { Equipment } from '../../equipment/entities/equipment.entity';

@Entity()
export class EquipmentPositionHistory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('timestamp')
    date: Date;

    @Column('decimal', { precision: 10, scale: 6 })
    lat: number;

    @Column('decimal', { precision: 10, scale: 6 })
    lon: number;

    @ManyToOne(() => Equipment, (equipment) => equipment.positionHistories)
    equipment: Equipment;
}
