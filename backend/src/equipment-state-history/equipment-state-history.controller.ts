import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipmentStateHistoryService } from './equipment-state-history.service';
import { CreateEquipmentStateHistoryDto } from './dto/create-equipment-state-history.dto';
import { UpdateEquipmentStateHistoryDto } from './dto/update-equipment-state-history.dto';

@Controller('equipment-state-history')
export class EquipmentStateHistoryController {
  constructor(private readonly equipmentStateHistoryService: EquipmentStateHistoryService) {}

  @Post()
  async create(@Body() createEquipmentStateHistoryDto: CreateEquipmentStateHistoryDto) {
    return await this.equipmentStateHistoryService.create(createEquipmentStateHistoryDto);
  }

  @Get()
  async findAll() {
    return await this.equipmentStateHistoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.equipmentStateHistoryService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEquipmentStateHistoryDto: UpdateEquipmentStateHistoryDto) {
    return await this.equipmentStateHistoryService.update(id, updateEquipmentStateHistoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.equipmentStateHistoryService.remove(id);
  }
}
