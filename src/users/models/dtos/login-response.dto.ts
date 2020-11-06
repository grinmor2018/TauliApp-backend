import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from './user.dto';

export class LoginResponseDTO {
    @ApiProperty() token: string;

    @ApiProperty({ type: UserDTO })
    user: UserDTO;

    constructor(partial: Partial<LoginResponseDTO>) {
        Object.assign(this, partial);
    }
}
