import { BaseModelDTO } from "src/common/base.model"
import { UserRole } from "../user-role.enum";
import { Expose, Exclude } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { User } from "../user.schema";

@Exclude()
export class UserDTO extends BaseModelDTO {
    
    @ApiPropertyOptional({ example: 'Benito' })
    @Expose()
    readonly nom: string;

    @ApiPropertyOptional({ example: 'Camela' })
    @Expose()
    readonly cognom1: string;

    @ApiPropertyOptional({ example: 'Otravez' })
    @Expose()
    readonly cognom2: string;

    @ApiPropertyOptional({ enum: UserRole, default: 'User' })
    @Expose()
    readonly role?: UserRole;

    @ApiPropertyOptional({ example: '47402225A' })
    @Expose()
    readonly nif: string;

    @ApiPropertyOptional({ example: 'ARPO123456780' })
    @Expose()
    cip: string;

    @ApiPropertyOptional({ example: '656988634' })
    @Expose()
    mobilePhone: string;

    @ApiPropertyOptional({ example: 'benitocamelaotravez@gmail.com' })
    @Expose()
    email: string;

    @ApiPropertyOptional()
    @Expose()
    birthdate: Date;

    @ApiPropertyOptional({ default: true })
    @Expose()
    active: boolean;

    @ApiPropertyOptional()
    @Expose()
    dependencies: [];

    constructor(partial: Partial<UserDTO>) {
        super();
        Object.assign(this, partial);
    }

}