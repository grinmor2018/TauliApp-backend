import { Module, Global } from '@nestjs/common';
import { ConfigurationService } from './configuration/configuration.service';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/strategies/jwt-strategy.service';
import { UsersModule } from 'src/users/users.module';

@Global()
@Module({
    providers: [ConfigurationService, AuthService, JwtStrategy],
    exports: [ConfigurationService, AuthService],
    imports: [UsersModule]
})
export class CommonModule {}
