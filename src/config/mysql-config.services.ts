import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategy';
import { join } from 'path';

@Injectable()
export class MysqlConfigService implements TypeOrmOptionsFactory {
  private readonly logger = new Logger(MysqlConfigService.name);

  constructor(private readonly cfgSvc: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isDevelopment = this.cfgSvc.get<string>('ENV') !== 'production';

    const dbHost = this.cfgSvc.get<string>('DB_HOST');
    const dbPort = parseInt(this.cfgSvc.get<string>('DB_PORT'), 10);
    const dbUsername = this.cfgSvc.get<string>('DB_USERNAME');
    const dbPassword = this.cfgSvc.get<string>('DB_PASSWORD');
    const dbName = this.cfgSvc.get<string>('DB_NAME');

    if (!dbHost || !dbPort || !dbUsername || !dbPassword || !dbName) {
      this.logger.error('Database configuration is missing required environment variables.');
      throw new Error('Database configuration is incomplete.');
    }

    return {
      type: 'mysql',
      host: dbHost,
      port: dbPort,
      username: dbUsername,
      password: dbPassword,
      database: dbName,
      autoLoadEntities: true,
      entities: [join(process.cwd(), 'dist/**/*.entity{.ts,.js}')],
      synchronize: isDevelopment,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
