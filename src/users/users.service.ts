import { Injectable, HttpException, HttpStatus, forwardRef, Inject } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { User } from './models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { RegisterDTO } from './models/dtos/register.dto';
import { LoginResponseDTO } from './models/dtos/login-response.dto';
import { LoginDTO } from './models/dtos/login.dto';
import { JwtPayload } from 'src/common/auth/jwt-payload.model';
import { AuthService } from 'src/common/auth/auth.service';
import { UserDTO } from './models/dtos/user.dto';

@Injectable()
export class UsersService extends BaseService<User>{
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        //forwardRef: A circular dependency occurs when two classes depend on each other.
        //AuthService depen de UsersService i al reves.
        @Inject(forwardRef(() => AuthService))
        readonly authService: AuthService,
    ) {
        super();
        this._model = userModel;
    }

    async register(dto: RegisterDTO) {
        const { nif, password } = dto;

        const newUser = new this.userModel(dto);

        const salt = await genSalt(10);
        newUser.password = await hash(password, salt);
        
        try {
            const result = await this.create(newUser);
            return new UserDTO(result.toJSON());
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(dto: LoginDTO): Promise<LoginResponseDTO> {
        const { nif , password } = dto;

        const user = await this.findOne({ nif });

        if (!user) {
            throw new HttpException('Invalid crendentials', HttpStatus.NOT_FOUND);
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            throw new HttpException('Invalid crendentials', HttpStatus.BAD_REQUEST);
        }

        const payload: JwtPayload = {
            nif: user.nif,
            role: user.role,
        };

        const token = await this.authService.signPayload(payload);


        const userDTO: UserDTO = new UserDTO(user.toJSON())
        return new LoginResponseDTO({ token, user: userDTO });
    }

}
