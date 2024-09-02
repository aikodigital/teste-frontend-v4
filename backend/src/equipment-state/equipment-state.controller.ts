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
import { EquipmentStateService } from './equipment-state.service';
import { CreateEquipmentStateDto } from './dto/create-equipment-state.dto';
import { UpdateEquipmentStateDto } from './dto/update-equipment-state.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('equipment-state')
@Controller('equipment-state')
export class EquipmentStateController {
  constructor(private readonly equipmentStateService: EquipmentStateService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createEquipmentStateDto: CreateEquipmentStateDto) {
    return await this.equipmentStateService.create(createEquipmentStateDto);
  }

  @Get()
  async findAll() {
    return await this.equipmentStateService.findAll();
  }

  @Get(':id')
  async indOne(@Param('id') id: string) {
    return await this.equipmentStateService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updateEquipmentStateDto: UpdateEquipmentStateDto,
  ) {
    return await this.equipmentStateService.update(id, updateEquipmentStateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    return await this.equipmentStateService.remove(id);
  }
}
