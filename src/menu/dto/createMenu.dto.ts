import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @IsNotEmpty({
    message: 'Campo name é obrigatório',
  })
  @IsString({
    message: 'O campo name deve ser obrigatoriamente uma string ',
  })
  @ApiProperty({
    default: 'Coca-cola',
    description: 'nome do produto',
  })
  name: string;

  @IsNotEmpty({
    message: 'Campo imgUrl é obrigatório',
  })
  @IsUrl({
    message: 'O campo imgUrl deve ser obrigatoriamente uma URL ',
  })
  @ApiProperty({
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkcUwj6CAmNh2Z-PMz7aD0V1eAB-sVFPG5ng&usqp=CAU',
    description: 'imagem do produto',
  })
  imgUrl: string;

  @IsNotEmpty({
    message: 'Campo description é obrigatório',
  })
  @IsString({
    message: 'O campo description deve ser obrigatoriamente uma string ',
  })
  @ApiProperty({
    default: 'refrigerante lata 350ml',
    description: 'descrição do produto',
  })
  description: string;

  @IsNumber()
  @IsNotEmpty({
    message: 'Campo price é obrigatório',
  })
  @ApiProperty({
    default: 4.50,
    description: 'preço do produto',
  })
  price: number;

  @IsNumber()
  @IsNotEmpty({
    message: 'Campo price é obrigatório',
  })
  @ApiProperty({
    default: 1,
    description: 'id da categoria',
  })
  category: number;
}
