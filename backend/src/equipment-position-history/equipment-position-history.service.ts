import { Injectable } from '@nestjs/common';
import { CreateEquipmentPositionHistoryDto } from './dto/create-equipment-position-history.dto';
import { UpdateEquipmentPositionHistoryDto } from './dto/update-equipment-position-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipmentPositionHistory } from './entities/equipment-position-history.entity';
import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EquipmentPositionHistoryService {
  constructor(
    @InjectModel(EquipmentPositionHistory.name)
    private readonly equipmentPositionHistoryModel: Model<EquipmentPositionHistory>,
  ) {}

  async create(
    createEquipmentPositionHistoryDto: CreateEquipmentPositionHistoryDto,
  ) {
    return await new this.equipmentPositionHistoryModel(
      createEquipmentPositionHistoryDto,
    ).save();
  }

  async findAll(queries) {
    const { equipment } = queries;
    if (!!equipment) {
      const data = await this.equipmentPositionHistoryModel
        .findOne({ 'equipment._id': equipment })
        .populate({ path: 'equipment' })
        .exec();
      return data;
    }
    const data = await this.equipmentPositionHistoryModel
      .find()
      .populate({
        path: 'equipment',
      })
      .exec();
    return data;
  }

  async findOne(id: string) {
    const data = await this.equipmentPositionHistoryModel
      .findById(id)
      .populate({
        path: 'equipment',
        populate: { path: 'equipmentModel' },
      })
      .exec();
    return data;
  }

  async update(
    id: string,
    updateEquipmentPositionHistoryDto: UpdateEquipmentPositionHistoryDto,
  ) {
    const data = await this.equipmentPositionHistoryModel
      .findByIdAndUpdate(id, updateEquipmentPositionHistoryDto, { new: true })
      .exec();
    return await this.findOne(id);
  }

  async remove(id: string) {
    const equipmentPositionHistory = await this.findOne(id);
    await this.equipmentPositionHistoryModel.findByIdAndDelete(id).exec();
    return `EquipmentPositionHistory ${id} deleted!`;
  }
}
