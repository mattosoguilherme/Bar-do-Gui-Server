import { User } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginResponseDto {
    @IsString()
    @IsNotEmpty()
    token:string;

    @IsNotEmpty()
    user:User;
}