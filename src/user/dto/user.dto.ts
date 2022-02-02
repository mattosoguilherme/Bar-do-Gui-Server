import { IsString, IsNotEmpty, IsEmail, IsDate } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDate()
  @IsNotEmpty()
  createAt: Date;

  @IsNotEmpty()
  @IsDate()
  updateAt: Date;
}
