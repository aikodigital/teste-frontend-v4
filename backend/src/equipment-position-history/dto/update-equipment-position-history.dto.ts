import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentPositionHistoryDto } from './create-equipment-position-history.dto';

export class UpdateEquipmentPositionHistoryDto extends PartialType(CreateEquipmentPositionHistoryDto) {}
