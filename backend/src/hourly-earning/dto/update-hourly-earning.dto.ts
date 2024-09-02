import { PartialType } from '@nestjs/mapped-types'; 
import { CreateHourlyEarningsDto } from './create-hourly-earning.dto';

export class UpdateHourlyEarningDto extends PartialType(CreateHourlyEarningsDto) {}
