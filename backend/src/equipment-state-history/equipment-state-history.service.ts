import { Injectable } from '@nestjs/common';
import { CreateEquipmentStateHistoryDto } from './dto/create-equipment-state-history.dto';
import { UpdateEquipmentStateHistoryDto } from './dto/update-equipment-state-history.dto';
import { EquipmentStateHistory } from './entities/equipment-state-history.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EquipmentStateHistoryService {

  constructor(
    @InjectRepository(EquipmentStateHistory)
    private equipmentStateHistoryRepository: Repository<EquipmentStateHistory>,
  ){}
  
 async create(createEquipmentStateHistoryDto: CreateEquipmentStateHistoryDto) {
    const equipmentStateHistory = await this.equipmentStateHistoryRepository.create(createEquipmentStateHistoryDto);
    return await this.equipmentStateHistoryRepository.save(equipmentStateHistory);
 }

 async findAll() {  
    return await this.equipmentStateHistoryRepository.find();
 }

 async findOne(id: string) {  
    return await this.equipmentStateHistoryRepository.findOne({ where: { id } });
 }

 async update(id: string, updateEquipmentStateHistoryDto: UpdateEquipmentStateHistoryDto) {
    const equipmentStateHistory = await this.equipmentStateHistoryRepository.update(id, updateEquipmentStateHistoryDto);
    return await this.findOne(id);  
 }

 async remove(id: string) { 
  const equipmentStateHistory = await this.equipmentStateHistoryRepository.findOne({ where: { id } });
  await this.equipmentStateHistoryRepository.delete(equipmentStateHistory);
  return `Equipment State History ${id} deleted`;
}

}
