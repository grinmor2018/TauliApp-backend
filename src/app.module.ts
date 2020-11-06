import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ConfigurationService } from './common/configuration/configuration.service';
import { Configuration } from './common/configuration/configuration.enum';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CommonModule, MongooseModule.forRootAsync({
    imports: [CommonModule],
    useFactory: async (_configService: ConfigurationService) => ({
      uri: _configService.get(Configuration.MONGO_URI),
      retryDelay: 500,
      retryAttempts: 3,
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
    }),
    inject: [ConfigurationService],
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static host: string;
  static port: number | string;
  static isDev: boolean;

  constructor(private readonly _configurationService: ConfigurationService) {
    AppModule.port = AppModule.normalizePort(_configurationService.get(Configuration.PORT));
    AppModule.host = _configurationService.get(Configuration.HOST);
    AppModule.isDev = _configurationService.isDevelopment;
  }

  private static normalizePort(param: number | string): number | string {
    const portNumber: number = typeof param === 'string' ? parseInt(param, 10) : param;
    if (isNaN(portNumber)) return param;
    else if (portNumber >= 0) return portNumber;
  }
}
