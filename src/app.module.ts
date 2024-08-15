import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountsModule } from './accounts/accounts.module';
import { MysqlConfigService } from './config/mysql-config.services';
import { UsersModule } from './user-logs/user-logs.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal:  true , envFilePath: ['.env']}),
    TypeOrmModule.forRootAsync({
      useClass:MysqlConfigService,
    }),
    AccountsModule,
    UsersModule,
    AuthModule,
    UploadModule
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    console.log('Database Host:', this.configService.get('DB_HOST'));
    console.log('Database Port:', this.configService.get('DB_PORT'));
  }

}
