import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty({
    message: 'Campo tableId é obrigatório',
  })
  @IsString({
    message: 'O campo tableId deve ser obrigatoriamente uma string ',
  })
  @ApiProperty({
    default: '4582face-7ee4-4a85-813a-01c01ed8a205',
    description: 'Id da mesa',
  })
  tableId: string;

  @IsNotEmpty({
    message: 'Campo menuId é obrigatório',
  })
  @IsString({
    message: 'O campo menuId deve ser obrigatoriamente uma string ',
  })
  @ApiProperty({
    default: '4582face-7ee4-4a85-813a-01c01ed8a205',
    description: 'Id do item',
  })
  menuId: string;


  @IsOptional()
  @IsString({
    message: 'O campo observation deve ser obrigatoriamente uma string ',
  })
  @ApiProperty({
    default: 'Sem gelo e com limão',
    description: 'Observação opcional do pedido',
  })
  observation:string;
}
