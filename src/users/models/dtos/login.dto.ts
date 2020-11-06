import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {

    @ApiProperty({ example: '47402225A' })
    @IsString()
    @IsNotEmpty()
    readonly nif: string;

    @ApiProperty({ example: 'holahola123' })
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}