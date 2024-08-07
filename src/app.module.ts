import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodosModule } from './todos/todos.module';
import { AccountsModule } from './accounts/accounts.module';
import { ImagesModule } from './image-profile/images.module';
import { MysqlConfigService } from './config/mysql-config.services';
import { UsersModule } from './user-logs/user-logs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal:  true , envFilePath: ['.env']}),
    TypeOrmModule.forRootAsync({
      useClass:MysqlConfigService,
      inject:[MysqlConfigService]
    }),
    AccountsModule,
    ImagesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
