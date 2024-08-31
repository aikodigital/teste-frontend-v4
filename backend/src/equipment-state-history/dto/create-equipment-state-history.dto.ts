import { IsUUID, IsArray, ValidateNested, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class StateHistoryDto {
  @ApiProperty({ description: 'Data em que o equipamento declarou estar nesse estado' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ description: 'Chave estrangeira, utilizada para referenciar qual é o estado' })
  @IsUUID()
  @IsNotEmpty()
  equipmentStateId: string;
}

export class CreateEquipmentStateHistoryDto {
  @ApiProperty({ description: 'Chave estrangeira, utilizada para referenciar de qual equipamento são esses estados' })
  @IsUUID()
  @IsNotEmpty()
  equipmentId: string;

  @ApiProperty({
    description: 'Histórico de estados do equipamento',
    type: [StateHistoryDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StateHistoryDto)
  states: StateHistoryDto[];
}
