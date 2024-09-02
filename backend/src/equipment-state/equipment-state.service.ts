import { Injectable } from '@nestjs/common';
import { CreateEquipmentStateDto } from './dto/create-equipment-state.dto';
import { UpdateEquipmentStateDto } from './dto/update-equipment-state.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipmentState } from './entities/equipment-state.entity';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EquipmentStateService {

  constructor(
    @InjectModel(EquipmentState.name)
    private readonly equipmentStateModel: Model<EquipmentState>,
  ) { }
  
  async create(createEquipmentStateDto: CreateEquipmentStateDto) {
    return await new this.equipmentStateModel(createEquipmentStateDto).save();
  }
  
  async findAll() {
    const data = await this.equipmentStateModel.find().exec();  
    return data;
  }

  async findOne(id: string) {
    const data = await this.equipmentStateModel.findById(id) .exec();  
    return data;
  }

  async update(id: string, updateEquipmentStateDto: UpdateEquipmentStateDto) {
    await this.equipmentStateModel.findByIdAndUpdate(id, updateEquipmentStateDto, { new: true }).exec();
    return await this.findOne(id);
  } 

  async remove(id: string) {
    const equipmentState = await this.findOne(id);
    await this.equipmentStateModel.findByIdAndDelete(id).exec();

    return `Equipment State ${id} deleted`;
  }

}
