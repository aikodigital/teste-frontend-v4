import { Injectable } from '@nestjs/common';
import { CreateHourlyEarningDto } from './dto/create-hourly-earning.dto';
import { UpdateHourlyEarningDto } from './dto/update-hourly-earning.dto';
import { HourlyEarning } from './entities/hourly-earning.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HourlyEarningService {
  constructor(
    @InjectRepository(HourlyEarning)
    private hourlyEarningRepository: Repository<HourlyEarning>,
  ) {}

  async create(createHourlyEarningDto: CreateHourlyEarningDto) {
    const hourlyEarning = await this.hourlyEarningRepository.create(createHourlyEarningDto);
    return await this.hourlyEarningRepository.save(hourlyEarning);
  }

  async findAll() { 
    return await this.hourlyEarningRepository.find();
  }

  async findOne(id: string) { 
    return await this.hourlyEarningRepository.findOne({ where: { id } });
  }

  async update(id: string, updateHourlyEarningDto: UpdateHourlyEarningDto) {
    const hourlyEarning = await this.hourlyEarningRepository.update(id, updateHourlyEarningDto);
    return await this.findOne(id);
  } 
  
  async remove(id: string) { 
    const hourlyEarning = await this.hourlyEarningRepository.findOne({ where: { id } });
    await this.hourlyEarningRepository.delete(hourlyEarning);
    return `Hourly Earning ${id} deleted`;
  }
  
}
