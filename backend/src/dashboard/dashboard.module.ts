import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Equipment } from 'src/equipment/entities/equipment.entity';
import { EquipmentModel } from 'src/equipment-model/entities/equipment-model.entity';
import { EquipmentModelModule } from 'src/equipment-model/equipment-model.module';
import { EquipmentModule } from 'src/equipment/equipment.module';
import { EquipmentPositionHistoryModule } from 'src/equipment-position-history/equipment-position-history.module';
import { EquipmentStateHistoryModule } from 'src/equipment-state-history/equipment-state-history.module';
import { EquipmentStateModule } from 'src/equipment-state/equipment-state.module';
import { HourlyEarningModule } from 'src/hourly-earning/hourly-earning.module';

@Module({
  imports: [
    EquipmentModelModule,
    EquipmentModule,
    EquipmentPositionHistoryModule,
    EquipmentStateHistoryModule,
    EquipmentStateModule,
    HourlyEarningModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
