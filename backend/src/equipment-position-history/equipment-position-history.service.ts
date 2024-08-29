import { Injectable } from '@nestjs/common';
import { CreateEquipmentPositionHistoryDto } from './dto/create-equipment-position-history.dto';
import { UpdateEquipmentPositionHistoryDto } from './dto/update-equipment-position-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipmentPositionHistory } from './entities/equipment-position-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EquipmentPositionHistoryService {
 constructor(
    @InjectRepository(EquipmentPositionHistory)
    private equipmentPositionHistoryRepository: Repository<EquipmentPositionHistory>,
    
  ) {}

  async create(createEquipmentPositionHistoryDto: CreateEquipmentPositionHistoryDto) {  
    const equipmentPositionHistory = await this.equipmentPositionHistoryRepository.create(createEquipmentPositionHistoryDto);  
    return await this.equipmentPositionHistoryRepository.save(equipmentPositionHistory);
  }

  async findAll() { 
    return await this.equipmentPositionHistoryRepository.find();
  }

  async findOne(id: string) { 
    return await this.equipmentPositionHistoryRepository.findOne({ where: { id } });
  }

  async update(id: string, updateEquipmentPositionHistoryDto: UpdateEquipmentPositionHistoryDto) {
    const equipmentPositionHistory = await this.equipmentPositionHistoryRepository.update(id, updateEquipmentPositionHistoryDto);
    return await this.findOne(id);
  }

  async remove(id: string) { 
    const equipmentPositionHistory = await this.equipmentPositionHistoryRepository.findOne({ where: { id } });
    await this.equipmentPositionHistoryRepository.delete(equipmentPositionHistory);
    return `EquipmentPositionHistory ${equipmentPositionHistory.equipment.name} deleted!`;
  }
}
