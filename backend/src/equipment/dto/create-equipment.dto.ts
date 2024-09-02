import { IsUUID, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEquipmentDto {
  @ApiProperty({ description: 'Chave estrangeira, utilizada para referenciar de qual modelo é esse equipamento' })
  @IsUUID()
  @IsNotEmpty()
  equipmentModelId: string;

  @ApiProperty({ description: 'Nome do Equipamento' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
