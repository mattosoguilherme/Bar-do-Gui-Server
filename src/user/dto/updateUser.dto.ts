import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from 'src/utils/roles.enum';
import { CreateUserDto } from './createUser.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  role?: Role;

  @IsOptional()
  password_system?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  name?: string;

  @ApiProperty({
    default: '123456',
    description: 'senha do usuário',
  })
  @IsString({
    message: 'O campo password deve ser obrigatoriamente uma string ',
  })
  @MinLength(6, {
    message:
      ' O mínimo de caracteres exigidos nos campos de senha são 6. Ex: 123456 ',
  })
  @IsOptional()
  actualPass: string;

  @IsString({
    message: 'O campo newPass deve ser obrigatoriamente uma string ',
  })
  @IsOptional()
  @ApiProperty({
    default: '123456',
    description: 'nova senha do usuário',
  })
  @MinLength(6, {
    message:
      ' O mínimo de caracteres exigidos nos campos de senha são 6. Ex: 123456 ',
  })
  newPass: string;

  @IsString({
    message:
      'O campo newPassConfirmation deve ser obrigatoriamente uma string ',
  })
  @IsOptional()
  @ApiProperty({
    default: '123456',
    description: 'senha de confirmação do usuário',
  })
  @MinLength(6, {
    message:
      ' O mínimo de caracteres exigidos nos campos de senha são 6. Ex: 123456 ',
  })
  newPassConfirmation: string;
}
