import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class DateReportDto {
  @IsDateString()
  @ApiProperty({
    description: 'Data de busca para gerar relatório referente ao fluxo diário',
  })
  dateToSearch: Date;
}
