import { Injectable } from '@nestjs/common';
import { CreateEquipmentStateDto } from './dto/create-equipment-state.dto';
import { UpdateEquipmentStateDto } from './dto/update-equipment-state.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipmentState } from './entities/equipment-state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EquipmentStateService {

  constructor(
    @InjectRepository(EquipmentState)
    private equipmentStateRepository: Repository<EquipmentState>,
  ) { }
  
  async create(createEquipmentStateDto: CreateEquipmentStateDto) {
    const equipmentState = await this.equipmentStateRepository.create(createEquipmentStateDto);
    return await this.equipmentStateRepository.save(equipmentState);
  }
  
  async findAll() {
    return await this.equipmentStateRepository.find();
  }

  async findOne(id: string) {
    return await this.equipmentStateRepository.findOne({ where: { id } });
  }

  async update(id: string, updateEquipmentStateDto: UpdateEquipmentStateDto) {
    const equipmentState = await this.equipmentStateRepository.update(id, updateEquipmentStateDto);
    return await this.findOne(id);
  } 

  async remove(id: string) {
    const equipmentState = await this.equipmentStateRepository.findOne({ where: { id } });
    await this.equipmentStateRepository.delete(equipmentState);
    return `Equipment State ${id} deleted`;
  }

}
