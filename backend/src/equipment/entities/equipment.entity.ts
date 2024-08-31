import { EquipmentModel } from 'src/equipment-model/entities/equipment-model.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'; 

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => EquipmentModel)
  equipmentModel: EquipmentModel;

  @Column()
  name: string;
}
