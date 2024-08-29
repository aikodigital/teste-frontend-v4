import { Injectable } from '@nestjs/common';
import { CreateEquipmentModelDto } from './dto/create-equipment-model.dto';
import { UpdateEquipmentModelDto } from './dto/update-equipment-model.dto';
import { EquipmentModel } from './entities/equipment-model.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EquipmentModelService {
  constructor(
    @InjectRepository(EquipmentModel) 
    private equipmentModelRepository: Repository<EquipmentModel> 
  ){}

  async create(createEquipmentModelDto: CreateEquipmentModelDto) {
    const equipmentModel = await this.equipmentModelRepository.create(createEquipmentModelDto);
    return await this.equipmentModelRepository.save(equipmentModel);    
  }

  async findAll() {
    return await this.equipmentModelRepository.find();
  }

  async findOne(id: string) {
    return await this.equipmentModelRepository.findOne({ where: { id } });
  }


  async update(id: string, updateEquipmentModelDto: UpdateEquipmentModelDto) {  
    const equipmentModel = await this.equipmentModelRepository.update(id, updateEquipmentModelDto);
    return await this.findOne(id);
  }

  async remove(id: string) {  
    const equipmentModel = await this.findOne(id);
    await this.equipmentModelRepository.delete(equipmentModel);
    return `EquipmentModel ${equipmentModel.name} deleted!`;
  }
}
