import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tableId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  itemId: string;
}
