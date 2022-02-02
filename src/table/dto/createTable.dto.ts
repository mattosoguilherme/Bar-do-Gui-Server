import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTableDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    observation: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    menuItem:string
}