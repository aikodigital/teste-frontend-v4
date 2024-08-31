import { HourlyEarnings } from 'src/hourly-earning/entities/hourly-earning.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'; 

@Entity()
export class EquipmentState {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @OneToMany(() => HourlyEarnings, (hourlyEarnings) => hourlyEarnings.equipmentState)
  hourlyEarnings: HourlyEarnings[];
}
