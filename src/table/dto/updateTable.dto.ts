import {  PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateTableDto } from './createTable.dto';

export class UpdateTableDto extends PartialType(CreateTableDto) {
  @IsOptional()
  observation?: string;
  @IsOptional()
  kid?: number;
  @IsOptional()
  adult?: number;
}
