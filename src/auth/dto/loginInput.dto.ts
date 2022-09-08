import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginInputDto {
  @IsEmail()
  @ApiProperty({
    default: 'guilhermemktfran@gmail.com',
    description: 'email do usuário cadastrado',
  })
  @IsNotEmpty({
    message: 'Campo email é obrigatório',
  })
  @IsString({
    message: 'O campo email deve ser obrigatoriamente uma string ',
  })
  email: string;

  @ApiProperty({
    default: '123456',
    description: 'senha do usuário cadastrado',
  })
  @IsNotEmpty({
    message: 'Campo password é obrigatório',
  })
  @IsString({
    message: 'O campo password deve ser obrigatoriamente uma string ',
  })
  @MinLength(6)
  password: string;
}
