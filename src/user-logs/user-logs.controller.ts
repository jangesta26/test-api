import { Controller, Post, Body, HttpException, HttpStatus, Get } from '@nestjs/common';
import { UsersService } from './user-logs.service';
import { CreateUsersLogsDto } from './dto/create-users.dto';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { UserLog } from './entity/users.entity';

@Controller('users_logs')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async registerLogs(@Body() createUserDto: CreateUsersLogsDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('report')
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<UserLog>> {
    try{
      return this.usersService.findAll(query);
    }catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
   
  }

}
