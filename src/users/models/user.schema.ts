import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel, schemaOptions } from 'src/common/base.model';
import { UserRole, UserRoles } from './user-role.enum';
import { Exclude } from 'class-transformer';

@Schema(schemaOptions)
export class User extends BaseModel<User> {
    @Prop({
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        lowercase: true
    })
    username: string;

    @Prop({
        required: true
    })
    password: string;

    @Prop({
        required: [true, 'Nif is required'],
        unique: true,
        trim: true,
        lowercase: true
    })
    nif: string;

    @Prop({
        required: true
    })
    cip: string;

    @Prop({
        required: true
    })
    mobilePhone: string;

    @Prop()
    email: string;

    @Prop()
    birthdate: Date;

    @Prop({
        default: true
    })
    active: boolean;

    @Prop()
    dependencies: [];

    @Prop({ enum: UserRoles, default: UserRole.User })
    role?: UserRole;

}


export const UserSchema = SchemaFactory.createForClass(User);