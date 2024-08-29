import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from './entities/equipment.entity';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment) private equipmentRepository: Repository<Equipment>,
  ){

  }

  async create(createEquipmentDto: CreateEquipmentDto) {
    const equipment = await this.equipmentRepository.create(createEquipmentDto);  
    return await this.equipmentRepository.save(equipment);
  }

  async findAll() {
    return await this.equipmentRepository.find();
  }

  async findOne(id: string) {
    return await this.equipmentRepository.findOne({ where: { id } });
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto) {
    const equipment = await this.equipmentRepository.update(id, updateEquipmentDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    const equipment = await this.equipmentRepository.findOne({ where: { id } });
    await this.equipmentRepository.delete(equipment);
    return `Equipment ${equipment.name} deleted!`;
  }
}
