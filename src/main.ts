import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const options = {
    cors: true,
  };
  //Nestfactory: classe NestFactory class exposes a few static methods that allow creating an application instance. 
  //The create() method returns an application object, which fulfills the INestApplication interface.
  const app = await NestFactory.create(AppModule, options);
  const hostDomain = AppModule.isDev ? `${AppModule.host}:${AppModule.port}` : AppModule.host;

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Taulí API')
    .setDescription('All Taulí API endpoints and resources')
    .setVersion('1.0.0')
    .addServer('/api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api-docs', app, document);

  //To set a prefix for every route registered in an HTTP application, use the setGlobalPrefix()
  app.setGlobalPrefix('api');
  
  //Pipes have two typical use cases:
  //transformation: transform input data to the desired form (e.g., from string to integer)
  //validation: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception when the data is incorrect
  
  //useGlobalPipes: Since the ValidationPipe was created to be as generic as possible, 
  //we can realize it's full utility by setting it up as a global-scoped pipe
  //so that it is applied to every route handler across the entire application.
  app.useGlobalPipes(new ValidationPipe());
  //Nest provides a set of standard exceptions that inherit from the base HttpException 
  //and represent many of the most common HTTP exceptions.
  //Global-scoped filters are used across the whole application, for every controller and every route handler.
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(AppModule.port);
  console.log('Server listens at port', AppModule.port);
}
bootstrap();
