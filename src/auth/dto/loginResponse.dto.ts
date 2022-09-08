import { User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginResponseDto {
  @IsNotEmpty({
    message: 'Campo token é obrigatório',
  })
  @IsString({
    message: 'O campo token deve ser obrigatoriamente uma string ',
  })
  token: string;
  
  @IsNotEmpty({
    message: 'Campo user é obrigatório',
  })
  user: User;
}
