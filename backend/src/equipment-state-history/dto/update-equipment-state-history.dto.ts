import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentStateHistoryDto } from './create-equipment-state-history.dto';

export class UpdateEquipmentStateHistoryDto extends PartialType(CreateEquipmentStateHistoryDto) {}
