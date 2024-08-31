import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEquipmentStateDto {
  @ApiProperty({ description: 'Nome do estado' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Cor utilizada para representar o estado' })
  @IsString()
  @IsNotEmpty()
  color: string;
}
