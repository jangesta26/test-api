import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  // dotenv.config();

  const app = await NestFactory.create(AppModule);

  const cfgSvc = app.get(ConfigService)
  const port = cfgSvc.get('PORT_TEST_API') || 3001

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
    preflightContinue: false,
    optionsSuccessStatus: 204, 
  });


  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
