import { IsString, IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer'; 
import { CreateHourlyEarningsDto } from 'src/hourly-earning/dto/create-hourly-earning.dto';

export class CreateEquipmentModelDto {
  @ApiProperty({ description: 'Nome do modelo de equipamento' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Valor gerado por hora para cada estado',
    type: [CreateHourlyEarningsDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHourlyEarningsDto)
  hourlyEarnings: CreateHourlyEarningsDto[];
}
