import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class DateReportDto {
  @IsDateString()
  @ApiProperty()
  dateToSearch: Date;
}
