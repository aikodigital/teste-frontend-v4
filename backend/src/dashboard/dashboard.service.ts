import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { EquipmentStateHistory } from 'src/equipment-state-history/entities/equipment-state-history.entity';
import { EquipmentStateHistoryService } from 'src/equipment-state-history/equipment-state-history.service';
import { Root } from './types/interfaces';
import { EquipmentService } from 'src/equipment/equipment.service';
import { EquipmentPositionHistoryService } from 'src/equipment-position-history/equipment-position-history.service';
import { Types } from 'mongoose';

@Injectable()
export class DashboardService {
  constructor(
    private readonly equipmentService: EquipmentService,
    private readonly equipmentStateHistoryService: EquipmentStateHistoryService,
    private readonly equipmentPositionHistoryService: EquipmentPositionHistoryService,
  ) {}

  async findAll() {
    const final = [];
    const queries = {};
    const equipment = await this.equipmentService.findAll();
    const equipmentStateHistory: any =
      await this.equipmentStateHistoryService.findAll(queries);
    const equipmentPositionHistory: any =
      await this.equipmentPositionHistoryService.findAll(queries);

    equipment.map((equipment: any) => {
      console.log('equipment._id:', equipment._id.toString());

      const equipmentStateHistoryArray = equipmentStateHistory.filter(
        (state: any) =>
          state.equipment._id.toString() == equipment._id.toString(),
      );

      const equipmentPositionHistoryArray = equipmentPositionHistory.filter(
        (history: any) =>
          history.equipment._id.toString() == equipment._id.toString(),
      );

      final.push({
        _id: equipment._id,
        equipmentModel: equipment.equipmentModel,
        name: equipment.name,
        states: equipmentStateHistoryArray,
        positions: equipmentPositionHistoryArray,
      });
    });

    return final;
  }
}
