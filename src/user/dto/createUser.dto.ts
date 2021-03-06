import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
import { Role } from 'src/utils/roles.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'USER' })
  role: Role;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  password_sistem: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  passwordConfirmation: string;
}
