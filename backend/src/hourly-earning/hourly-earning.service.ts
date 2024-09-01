import { Injectable } from '@nestjs/common'; 
import { UpdateHourlyEarningDto } from './dto/update-hourly-earning.dto'; 
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HourlyEarnings } from './entities/hourly-earning.entity';
import { CreateHourlyEarningsDto } from './dto/create-hourly-earning.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class HourlyEarningService {
  constructor(
    @InjectModel(HourlyEarnings.name)
    private readonly hourlyEarningModel: Model<HourlyEarnings>,
  ) {}

  async create(createHourlyEarningDto: CreateHourlyEarningsDto) { 
    return await new this.hourlyEarningModel(createHourlyEarningDto).save(); 
  }

  async findAll() { 
    const data = await this.hourlyEarningModel.find().populate({ 
      path: 'equipmentState',
    }).exec();  
    return data;
  }

  async findOne(id: string) { 
    const data = await this.hourlyEarningModel.findById(id).populate({ 
      path: 'equipmentState',
    }).exec();
    return data; 
  }

  async update(id: string, updateHourlyEarningDto: UpdateHourlyEarningDto) {
    const hourlyEarning = await this.hourlyEarningModel.findByIdAndUpdate(id, updateHourlyEarningDto, { new: true }).exec(); 
    return await this.findOne(id);
  } 
  
  async remove(id: string) { 
   const hourlyEarning = await this.findOne(id);
   await this.hourlyEarningModel.findByIdAndDelete(id).exec();
    return `Hourly Earning ${id} deleted`;
  }
  
}
