import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserTableDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @IsOptional()
    disconnect:boolean
}