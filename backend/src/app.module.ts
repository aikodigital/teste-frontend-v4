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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),  
    HourlyEarningModule,
    EquipmentModule,
    EquipmentModelModule,
    EquipmentStateHistoryModule,
    EquipmentStateModule,
    EquipmentPositionHistoryModule,  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
