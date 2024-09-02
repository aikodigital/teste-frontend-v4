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
import { EquipmentPositionHistoryService } from './equipment-position-history.service';
import { CreateEquipmentPositionHistoryDto } from './dto/create-equipment-position-history.dto';
import { UpdateEquipmentPositionHistoryDto } from './dto/update-equipment-position-history.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('equipment-position-history')
@Controller('equipment-position-history')
export class EquipmentPositionHistoryController {
  constructor(
    private readonly equipmentPositionHistoryService: EquipmentPositionHistoryService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body()
    createEquipmentPositionHistoryDto: CreateEquipmentPositionHistoryDto,
  ) {
    return await this.equipmentPositionHistoryService.create(
      createEquipmentPositionHistoryDto,
    );
  }

  @Get()
  async findAll(@Query() queries: { equipment: string }) {
    return await this.equipmentPositionHistoryService.findAll(queries);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.equipmentPositionHistoryService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body()
    updateEquipmentPositionHistoryDto: UpdateEquipmentPositionHistoryDto,
  ) {
    return await this.equipmentPositionHistoryService.update(
      id,
      updateEquipmentPositionHistoryDto,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    return await this.equipmentPositionHistoryService.remove(id);
  }
}
