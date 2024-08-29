import { PartialType } from '@nestjs/mapped-types';
import { CreateHourlyEarningDto } from './create-hourly-earning.dto';

export class UpdateHourlyEarningDto extends PartialType(CreateHourlyEarningDto) {}
