import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { Configuration } from '../../configuration/configuration.enum';
import { ConfigurationService } from '../../configuration/configuration.service';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../jwt-payload.model';

//Passport is the most popular node.js authentication library
//Passport executes a series of steps to:

//Authenticate a user by verifying their "credentials" (such as username/password, JSON Web Token (JWT), or identity token from an Identity Provider)
//Manage authenticated state (by issuing a portable token, such as a JWT, or creating an Express session)
//Attach information about the authenticated user to the Request object for further use in route handlers

//Passport has a rich ecosystem of strategies that implement various authentication mechanisms.
//you configure a strategy by providing two things:
    //A set of options that are specific to that strategy. For example, in a JWT strategy, you might provide a secret to sign tokens.
    //A "verify callback", which is where you tell Passport how to interact with your user store (where you manage user accounts). 
        //Here, you verify whether a user exists (and/or create a new user), and whether their credentials are valid. 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly _authService: AuthService,
        private readonly _configurationService: ConfigurationService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configurationService.get(Configuration.JWT_KEY),
        });
    }

    async validate(payload: JwtPayload, done: VerifiedCallback) {
        const user = await this._authService.validateUser(payload);
        if (!user) {
            return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
        }

        return done(null, user, payload.iat);
    }
}
