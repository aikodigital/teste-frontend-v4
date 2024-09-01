import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipment } from './entities/equipment.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectModel(Equipment.name) private readonly equipmentModel: Model<Equipment>, 
  ){

  }

  async create(createEquipmentDto: CreateEquipmentDto) {
    return  await new this.equipmentModel(createEquipmentDto).save();
  }

  async findAll() {
    const data = await this.equipmentModel.find().populate({
      path: 'equipmentModel',
      populate: { path: 'hourlyEarnings' },
    }).exec();
    return data;
  }

  async findOne(id: string) {
   const data = await this.equipmentModel.findById(id).exec();
   return data;
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto) {
    await this.equipmentModel.findByIdAndUpdate(id, updateEquipmentDto, { new: true }).exec();
    return await this.findOne(id);
  }

  async remove(id: string) {
    const equipment = await this.findOne(id);
    await this.equipmentModel.findByIdAndDelete(id).exec();
    return `Equipment ${equipment.name} deleted!`;
  }
}
