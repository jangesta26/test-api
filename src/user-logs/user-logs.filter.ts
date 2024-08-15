import { PaginateConfig  } from 'nestjs-paginate';
import { UserLog } from './entity/users.entity';

export const paginateConfig: PaginateConfig<UserLog> = {
  sortableColumns: ['user_logs_id'],
  defaultSortBy: [['user_logs_id', 'DESC']],
  searchableColumns: [
    'username',
    'createdAt'
  ],

  select: [
    'account_logs', 
  ],
  
  defaultLimit: 10,
};


