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
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('equipment')
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return await this.equipmentService.create(createEquipmentDto);
  }

  @Get()
  async findAll() {
    return await this.equipmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.equipmentService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    return await this.equipmentService.update(id, updateEquipmentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    return await this.equipmentService.remove(id);
  }
}
