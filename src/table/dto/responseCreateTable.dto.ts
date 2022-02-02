import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class ResponseCreateTableDto{

    @IsString()
    @IsNotEmpty()
    tableId: string;
    
    @IsNumber()
    @IsNotEmpty()
    numberTable:number;

    @IsString()
    @IsNotEmpty()
    observationTable:string;

    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    @IsString()
    userId:string;

    @IsNotEmpty()
    @IsString()
    menuTitle:string;

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    menuImgUrl:string;

    @IsNotEmpty()
    @IsString()
    menuDescription:string;

    @IsNotEmpty()
    @IsNumber()
    menuPrice:number;

    @IsNotEmpty()
    @IsString()
    menuProduct:string;

    @IsNotEmpty()
    @IsString()
    menuId:string;
}