import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLog } from './entity/users.entity';
import { CreateUsersLogsDto } from './dto/create-users.dto';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { paginateConfig } from './user-logs.filter';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserLog)
    private userLogRepository: Repository<UserLog>,
  ) {}

  async create(createUserDto: CreateUsersLogsDto): Promise<UserLog> {
    const log = this.userLogRepository.create(createUserDto);
    return await this.userLogRepository.save(log);
  }

  async logAttempt(accountId: number, username: string): Promise<UserLog> {
    const log = this.userLogRepository.create({ 
      userId: accountId,
      username: username,
      status: 1,
    });
    return await this.userLogRepository.save(log);
  }

  async findAll(query:PaginateQuery): Promise<Paginated<UserLog>> {
    return paginate(query, this.userLogRepository,paginateConfig)
      
  }

}
