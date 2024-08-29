import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentStateDto } from './create-equipment-state.dto';

export class UpdateEquipmentStateDto extends PartialType(CreateEquipmentStateDto) {}
