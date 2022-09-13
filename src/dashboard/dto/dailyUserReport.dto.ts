import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class DailyUserReportDto {
  @IsDateString()
  @IsNotEmpty({
    message: 'Campo dateToSearch é obrigatório',
  })
  @ApiProperty({
    description:
      'Data de busca para gerar relatório referente ao fluxo diário do usuário',
  })
  dateToSearch: Date;

  @IsString({
    message: 'O campo idUser deve ser obrigatoriamente uma string ',
  })
  @IsNotEmpty({
    message: 'Campo idUser é obrigatório',
  })
  @ApiProperty({
    description: 'ID do usuário',
  })
  idUser: string;
}
