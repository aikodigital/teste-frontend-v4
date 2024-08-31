import { Injectable } from '@nestjs/common'; 
import { UpdateHourlyEarningDto } from './dto/update-hourly-earning.dto'; 
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HourlyEarnings } from './entities/hourly-earning.entity';
import { CreateHourlyEarningsDto } from './dto/create-hourly-earning.dto';

@Injectable()
export class HourlyEarningService {
  constructor(
    @InjectRepository(HourlyEarnings)
    private hourlyEarningRepository: Repository<HourlyEarnings>,
  ) {}

  async create(createHourlyEarningDto: CreateHourlyEarningsDto) {
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
