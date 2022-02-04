import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  tableId: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  menuId: string;
}
