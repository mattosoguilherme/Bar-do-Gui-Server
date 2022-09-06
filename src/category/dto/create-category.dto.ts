import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({
    message: 'Campo category é obrigatório',
  })
  @IsString({
    message: 'O campo category deve ser obrigatoriamente uma string ',
  })
  @ApiProperty({
    default: 'bebida',
    description: 'categoria do produto',
  })
  category: string;
}
