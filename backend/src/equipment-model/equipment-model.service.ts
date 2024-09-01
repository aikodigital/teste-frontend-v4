import { Injectable } from '@nestjs/common';
import { CreateEquipmentModelDto } from './dto/create-equipment-model.dto';
import { UpdateEquipmentModelDto } from './dto/update-equipment-model.dto';
import { EquipmentModel } from './entities/equipment-model.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EquipmentModelService {
  constructor(
    @InjectModel(EquipmentModel.name) 
    private readonly equipmentModelModel: Model<EquipmentModel> 
  ){}

  async create(createEquipmentModelDto: CreateEquipmentModelDto) {
    return await new this.equipmentModelModel(createEquipmentModelDto).save();  
  }

  async findAll() {
    const data = await this.equipmentModelModel.find().populate({
      path: 'hourlyEarnings',
      populate: { path: 'equipmentState' },
    }).exec();
    return data;
  }

  async findOne(id: string) {
    const data = await this.equipmentModelModel.findById(id).populate({
      path: 'hourlyEarnings',
      populate: { path: 'equipmentState' },
    }).exec();
    return data;
  }


  async update(id: string, updateEquipmentModelDto: UpdateEquipmentModelDto) {  
    await this.equipmentModelModel.findByIdAndUpdate(id, updateEquipmentModelDto, { new: true }).exec();   
   return await this.findOne(id);
  }

  async remove(id: string) {  
    const equipmentModel = await this.findOne(id);
    await this.equipmentModelModel.findByIdAndDelete(id).exec();
    return `EquipmentModel ${equipmentModel.name} deleted!`;
  }
}
