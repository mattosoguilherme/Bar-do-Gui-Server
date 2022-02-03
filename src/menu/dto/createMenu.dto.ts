import { IsNotEmpty,IsNumber,IsOptional,IsString, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMenuDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    stock: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    imgUrl: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    product: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price:number
}