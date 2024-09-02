import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EquipmentStateHistoryService } from './equipment-state-history.service';
import { CreateEquipmentStateHistoryDto } from './dto/create-equipment-state-history.dto';
import { UpdateEquipmentStateHistoryDto } from './dto/update-equipment-state-history.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('equipment-state-history')
@Controller('equipment-state-history')
export class EquipmentStateHistoryController {
  constructor(
    private readonly equipmentStateHistoryService: EquipmentStateHistoryService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createEquipmentStateHistoryDto: CreateEquipmentStateHistoryDto,
  ) {
    return await this.equipmentStateHistoryService.create(
      createEquipmentStateHistoryDto,
    );
  }

  @Get()
  async findAll(@Query() queries: { equipment: string }) {
    return await this.equipmentStateHistoryService.findAll(queries);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.equipmentStateHistoryService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updateEquipmentStateHistoryDto: UpdateEquipmentStateHistoryDto,
  ) {
    return await this.equipmentStateHistoryService.update(
      id,
      updateEquipmentStateHistoryDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    return await this.equipmentStateHistoryService.remove(id);
  }
}
