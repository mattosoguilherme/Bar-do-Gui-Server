import { ApiProperty } from "@nestjs/swagger";
import {IsString,IsOptional,IsEmail,IsNotEmpty} from "class-validator";

export class UpdateUserDto{
    
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    @ApiProperty()
    email: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name:string;
}