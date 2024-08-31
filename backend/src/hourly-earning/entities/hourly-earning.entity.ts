import { EquipmentState } from 'src/equipment-state/entities/equipment-state.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'; 

@Entity()
export class HourlyEarnings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EquipmentState, (state) => state.hourlyEarnings)
  equipmentState: EquipmentState;

  @Column()
  value: number;
}
