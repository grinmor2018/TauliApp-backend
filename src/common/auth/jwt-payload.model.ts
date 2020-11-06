import { UserRole } from '../../users/models/user-role.enum';

export interface JwtPayload {
    nif: string;
    role: UserRole;
    iat?: Date;
}