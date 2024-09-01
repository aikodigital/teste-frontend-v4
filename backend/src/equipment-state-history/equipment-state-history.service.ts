import { Injectable } from '@nestjs/common';
import { CreateEquipmentStateHistoryDto } from './dto/create-equipment-state-history.dto';
import { UpdateEquipmentStateHistoryDto } from './dto/update-equipment-state-history.dto';
import { EquipmentStateHistory } from './entities/equipment-state-history.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EquipmentStateHistoryService {

  constructor(
    @InjectModel(EquipmentStateHistory.name)
    private readonly equipmentStateHistoryModel: Model<EquipmentStateHistory>,
  ) {}

  async create(createEquipmentStateHistoryDto: CreateEquipmentStateHistoryDto) {
    return await new this.equipmentStateHistoryModel(createEquipmentStateHistoryDto).save();
  }

 async findAll() {  
   const data = await this.equipmentStateHistoryModel.find()  .exec();
   return data;
 }

 async findOne(id: string) {  
   const data = await this.equipmentStateHistoryModel.findById(id) .exec();
   return data;
 }

 async update(id: string, updateEquipmentStateHistoryDto: UpdateEquipmentStateHistoryDto) {
   const equipmentStateHistory = await this.equipmentStateHistoryModel.findByIdAndUpdate(id, updateEquipmentStateHistoryDto, { new: true }).exec();  
   return await this.findOne(id);
 }

 async remove(id: string) { 
  const equipmentStateHistory = await this.findOne(id);
  await this.equipmentStateHistoryModel.findByIdAndDelete(id).exec();
  return `Equipment State History ${id} deleted`;
}

}
