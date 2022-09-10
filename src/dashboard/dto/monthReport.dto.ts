import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class MonthReportDto {
  @IsString()
  @ApiProperty()
  @Length(2, 2)
  monthToSearch: string;
}
