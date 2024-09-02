import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentModelDto } from './create-equipment-model.dto';

export class UpdateEquipmentModelDto extends PartialType(CreateEquipmentModelDto) {}
