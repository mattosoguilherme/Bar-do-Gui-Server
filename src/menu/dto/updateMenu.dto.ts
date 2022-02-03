import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateMenuDto {

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    stock:number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    imgUrl: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    product:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description:string;

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    @IsNotEmpty()
    price:number;
}