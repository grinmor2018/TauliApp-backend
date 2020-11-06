import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRole } from "../user-role.enum";
import { LoginDTO } from "./login.dto";
import { IsEmail, IsString, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterDTO extends LoginDTO {

    @ApiProperty({ example: 'usuari.test' })
    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @ApiProperty({ example: 'ARPO123456780' })
    @IsString()
    @IsNotEmpty()
    readonly cip: string;

    @ApiProperty({ example: '656988634' })
    @IsString()
    @IsNotEmpty()
    readonly mobilePhone: string;

    @ApiPropertyOptional({ example: 'usuari.test@gmail.com' })
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