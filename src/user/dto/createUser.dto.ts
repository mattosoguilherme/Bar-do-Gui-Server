import { ApiProperty } from '@nestjs/swagger';
import {
  MinLength,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { Role } from 'src/utils/roles.enum';

export class CreateUserDto {
  @IsString({
    message: 'O campo role deve ser obrigatoriamente uma string ',
  })
  @IsNotEmpty({
    message: 'Campo role é obrigatório',
  })
  @ApiProperty({
    default: 'USER',
    description: 'nível de acesso do usuário',
  })
  role: Role;

  @ApiProperty({
    default: '******',
    description: 'senha interna do sistema',
  })
  @IsNotEmpty({
    message: 'Campo password_system é obrigatório',
  })
  @IsString({
    message: 'O campo password_system deve ser obrigatoriamente uma string ',
  })
  @IsOptional()
  password_system: string;

  @IsNotEmpty({
    message: 'Campo name é obrigatório',
  })
  @IsString({
    message: 'O campo name deve ser obrigatoriamente uma string ',
  })
  @ApiProperty({
    default: 'Guilherme Mattoso',
    description: 'nome do usuário',
  })
  name: string;

  @ApiProperty({
    default: 'guilhermemktfran@gmail.com',
    description: 'email do usuário',
  })
  @IsString({
    message: 'O campo email deve ser obrigatoriamente uma string ',
  })
  @IsNotEmpty({
    message: 'Campo email é obrigatório',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    default: '******',
    description: 'senha do usuário',
  })
  @IsString({
    message: 'O campo password deve ser obrigatoriamente uma string ',
  })
  @IsNotEmpty({
    message: 'Campo password é obrigatório',
  })
  @MinLength(6, {
    message:
      ' O mínimo de caracteres exigidos nos campos de senha são 6. Ex: 123456 ',
  })
  password: string;

  @IsString({
    message:
      'O campo passwordConfirmation deve ser obrigatoriamente uma string ',
  })
  @ApiProperty({
    default: '******',
    description: 'senha de confirmação do usuário',
  })
  @IsNotEmpty({
    message: 'Campo passwordConfirmation é obrigatório',
  })
  @MinLength(6, {
    message:
      ' O mínimo de caracteres exigidos nos campos de senha são 6. Ex: 123456 ',
  })
  passwordConfirmation: string;
}
