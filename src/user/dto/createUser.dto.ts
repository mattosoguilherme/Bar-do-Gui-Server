import { ApiProperty } from '@nestjs/swagger';
import {MinLength, IsNotEmpty, IsString, IsEmail } from 'class-validator';


export class CreateUserDto {
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
