import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './http-exception.filter';
import * as dotenv from 'dotenv';

async function bootstrap() {

  dotenv.config();
  
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    preflightContinue: false, // Disable preflight requests (OPTIONS)
    optionsSuccessStatus: 204, // Set the OPTIONS request response code to 204
  });


  await app.listen(3001);
}
bootstrap();
