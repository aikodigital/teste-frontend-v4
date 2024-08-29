import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post()
  async create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return await this.equipmentService.create(createEquipmentDto);
  }

  @Get()
  async findAll() {
    return  await this.equipmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.equipmentService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEquipmentDto: UpdateEquipmentDto) {
    return await this.equipmentService.update(id, updateEquipmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.equipmentService.remove(id);
  }
}
