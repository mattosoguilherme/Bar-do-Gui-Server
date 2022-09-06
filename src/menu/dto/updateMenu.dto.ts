import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateMenuDto } from './createMenu.dto';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @IsOptional()
  name?: string;

  @IsOptional()
  imgUrl?: string;

  @IsOptional()
  category?: number;

  @IsOptional()
  description?: string;

  @IsOptional()
  price?: number;
}
