import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from 'src/utils/roles.enum';
import { CreateUserDto } from './createUser.dto';

export class UpdateCredentialsDto extends PartialType(CreateUserDto) {
  @IsOptional()
  role?: Role;
  
  @IsOptional()
  password?: string;

  @IsString({
    message: 'O campo newPass deve ser obrigatoriamente uma string ',
  })
  @IsNotEmpty({
    message: 'Campo newPass é obrigatório',
  })
  @ApiProperty({
    default: '******',
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
  @IsNotEmpty({
    message: 'Campo newPassConfirmation é obrigatório',
  })
  @ApiProperty({
    default: '******',
    description: 'senha de confirmação do usuário',
  })
  @MinLength(6, {
    message:
      ' O mínimo de caracteres exigidos nos campos de senha são 6. Ex: 123456 ',
  })
  newPassConfirmation: string;

  @IsOptional()
  password_system?: string;
}
