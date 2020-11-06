import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { sign, SignOptions } from 'jsonwebtoken';
import { User } from '../../users/models/user.schema';
import { UsersService } from '../../users/users.service';
import { Configuration } from '../configuration/configuration.enum';
import { ConfigurationService } from '../configuration/configuration.service';
import { JwtPayload } from './jwt-payload.model';

//Injectable(): indica que esta clase puede ser inyectada dinámicamente a quien la demande.
//Las clases son instanciables desde cualquier otro fichero que las importe. 
//Pero Angular nos sugiere y facilita que usemos su sistema de inyección de dependencias.
@Injectable()
export class AuthService {
    private readonly jwtOptions: SignOptions;
    private readonly jwtKey: string;

    constructor(
        //forwardRef: A circular dependency occurs when two classes depend on each other.
        //AuthService depen de UsersService i al reves.
        @Inject(forwardRef(() => UsersService))
        readonly userService: UsersService,
        private readonly configurationService: ConfigurationService,
    ) {
        this.jwtOptions = { expiresIn: '12h' };
        //configurationService dona la key
        this.jwtKey = configurationService.get(Configuration.JWT_KEY);
    }

    //JSON Web Tokens consist of three parts separated by dots (.), which are:
    //Header
    //Payload
    //Signature


    async signPayload(payload: JwtPayload): Promise<string> {
        return sign(payload, this.jwtKey, this.jwtOptions);
    }

    async validateUser(validatePayload: JwtPayload): Promise<User> {
        return this.userService.findOne({ nif: validatePayload.nif.toLowerCase() });
    }
}
