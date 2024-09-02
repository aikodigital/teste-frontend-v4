import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EquipmentModelService } from './equipment-model.service';
import { CreateEquipmentModelDto } from './dto/create-equipment-model.dto';
import { UpdateEquipmentModelDto } from './dto/update-equipment-model.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('equipment-model')
@Controller('equipment-model')
export class EquipmentModelController {
  constructor(private readonly equipmentModelService: EquipmentModelService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updateEquipmentModelDto: UpdateEquipmentModelDto,
  ) {
    return await this.equipmentModelService.update(id, updateEquipmentModelDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    return await this.equipmentModelService.remove(id);
  }
}
