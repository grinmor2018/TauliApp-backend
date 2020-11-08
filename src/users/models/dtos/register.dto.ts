import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRole } from "../user-role.enum";
import { LoginDTO } from "./login.dto";
import { IsEmail, IsString, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterDTO extends LoginDTO {

    @ApiProperty({ example: 'Alba' })
    @IsString()
    @IsNotEmpty()
    readonly nom: string;

    @ApiProperty({ example: 'Ñoguar' })
    @IsString()
    @IsNotEmpty()
    readonly cognom1: string;

    @ApiProperty({ example: 'Ras' })
    @IsString()
    @IsNotEmpty()
    readonly cognom2: string;

    @ApiProperty({ example: 'ARPO123456780' })
    @IsString()
    @IsNotEmpty()
    readonly cip: string;

    @ApiProperty({ example: '656988634' })
    @IsString()
    @IsNotEmpty()
    readonly mobilePhone: string;

    @ApiPropertyOptional({ example: 'albañoguarras@gmail.com' })
    @IsEmail()
    @IsString()
    @IsOptional()
    readonly email: string;

    @ApiPropertyOptional()
    @IsDateString()
    @IsOptional()
    readonly birthdate: Date;

    @ApiPropertyOptional({ enum: UserRole, default: 'User' })
    @IsOptional()
    @IsString()
    readonly role: UserRole

}