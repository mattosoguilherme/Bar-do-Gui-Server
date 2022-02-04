import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserPasswordDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    newPassword: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    newPasswordConfirmation:string;
}