import { IsUUID, IsArray, ValidateNested, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class PositionDto {
  @ApiProperty({ description: 'Data em que a posição foi registrada' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ description: 'Latitude WGS84' })
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @ApiProperty({ description: 'Longitude WGS84' })
  @IsNumber()
  @IsNotEmpty()
  lon: number;
}

export class CreateEquipmentPositionHistoryDto {
  @ApiProperty({ description: 'Chave estrangeira, utilizada para referenciar de qual equipamento são esses estados' })
  @IsUUID()
  @IsNotEmpty()
  equipmentId: string;

  @ApiProperty({
    description: 'Posições do equipamento',
    type: [PositionDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PositionDto)
  positions: PositionDto[];
}
