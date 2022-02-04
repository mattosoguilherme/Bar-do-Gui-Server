import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Role } from 'src/utils/roles.enum';

export class UpdateCredentialsDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @IsOptional()
    role: Role;

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    password_sistem:string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    newPassword: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    newPasswordConfirmation:string;
}