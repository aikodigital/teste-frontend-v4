import { Equipment } from 'src/equipment/entities/equipment.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'; 

@Entity()
export class EquipmentStateHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Equipment)
  equipment: Equipment;

  @Column('json')
  states: { date: Date; equipmentStateId: string }[];
}
