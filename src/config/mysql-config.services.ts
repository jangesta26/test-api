import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategy'
import { join } from 'path';

@Injectable()
export class MysqlConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly cfgSvc: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isDevelopment = this.cfgSvc.get<string>('ENV') !== 'production'

    return {
      type: 'mysql',
      host: this.cfgSvc.get<string>('DB_HOST'),
      port: this.cfgSvc.get<number>('DB_PORT'),
      username: this.cfgSvc.get<string>('DB_USERNAME'),
      password: this.cfgSvc.get<string>('DB_PASSWORD'),
      database: this.cfgSvc.get<string>('DB_NAME'),
      autoLoadEntities: true,
      entities: [join(process.cwd(), 'dist/**/*.entity.js')],
      synchronize: isDevelopment,
      namingStrategy: new SnakeNamingStrategy(),
    }
  }
}
