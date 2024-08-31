import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'; 

@Entity()
export class EquipmentPositionHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Equipment)
  equipment: Equipment;

  @Column('json')
  positions: { date: Date; lat: number; lon: number }[];
}
