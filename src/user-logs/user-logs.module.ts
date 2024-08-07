import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user-logs.service';
import { UsersController } from './user-logs.controller';
import { UserLog } from './entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    UserLog,
  ])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
