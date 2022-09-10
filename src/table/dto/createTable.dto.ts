import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTableDto {

  @IsString({
    message: 'O campo observation deve ser obrigatoriamente uma string ',
  })
  @ApiProperty({
    default: 'Cliente com alergia a lactose',
    description: 'Observação adicionais sobre a mesa',
  })
  @IsOptional()
  observation: string;

  @IsNotEmpty({
    message: 'Campo adult é obrigatório',
  })
  @IsNumber()
  @ApiProperty({
    default: 4,
    description: 'Quantidade de adultos numa mesa',
  })
  adult: number;

  @IsNotEmpty({
    message: 'Campo adult é obrigatório',
  })
  @IsNumber()
  @ApiProperty({
    default: 4,
    description: 'Quantidade de crianças numa mesa',
  })
  kid: number;
}
