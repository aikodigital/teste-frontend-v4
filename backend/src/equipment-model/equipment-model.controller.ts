import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipmentModelService } from './equipment-model.service';
import { CreateEquipmentModelDto } from './dto/create-equipment-model.dto';
import { UpdateEquipmentModelDto } from './dto/update-equipment-model.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('equipment-model')
@Controller('equipment-model')
export class EquipmentModelController {
  constructor(private readonly equipmentModelService: EquipmentModelService) {}

  @Post()
  async create(@Body() createEquipmentModelDto: CreateEquipmentModelDto) {
    return await this.equipmentModelService.create(createEquipmentModelDto);
  }

  @Get()
  async findAll() {
    return await this.equipmentModelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.equipmentModelService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEquipmentModelDto: UpdateEquipmentModelDto) {
    return await this.equipmentModelService.update(id, updateEquipmentModelDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.equipmentModelService.remove(id);
  }
}
