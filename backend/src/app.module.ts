import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { EquipmentModule } from './equipment/equipment.module';
import { EquipmentStateHistoryModule } from './equipment-state-history/equipment-state-history.module';   
import { EquipmentStateModule } from './equipment-state/equipment-state.module';  
import { EquipmentPositionHistoryModule } from './equipment-position-history/equipment-position-history.module';
import { HourlyEarningModule } from './hourly-earning/hourly-earning.module'; 
import { EquipmentModelModule } from './equipment-model/equipment-model.module';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DB_URI'), 
      }),
      inject: [ConfigService],
    }),   
    HourlyEarningModule,
    EquipmentModule,
    EquipmentModelModule,
    EquipmentStateHistoryModule,
    EquipmentStateModule,
    EquipmentPositionHistoryModule,
    DashboardModule,  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
