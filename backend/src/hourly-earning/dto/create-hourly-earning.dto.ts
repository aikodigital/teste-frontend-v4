import { IsUUID, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHourlyEarningsDto {
  @ApiProperty({ description: 'Chave estrangeira, utilizada para referenciar de qual valor é esse estado' })
  @IsUUID()
  @IsNotEmpty()
  equipmentStateId: string;

  @ApiProperty({ description: 'Valor gerado por hora nesse estado' })
  @IsNumber()
  @IsNotEmpty()
  value: number;
}
