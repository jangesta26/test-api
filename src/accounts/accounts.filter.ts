import { PaginateConfig  } from 'nestjs-paginate';
import { Accounts } from './entities/accounts.entity';

export const paginateConfig: PaginateConfig<Accounts> = {
  sortableColumns: ['id'],
  nullSort: 'last',
  defaultSortBy: [['id', 'DESC']],
  searchableColumns: [
    'fname',
    'lname', 
    'email', 
    'username',
    'createdAt'
  ],

  select: [
    'id', 
    'fname', 
    'lname',
    'gender',
    'dob', 
    'email', 
    'username',
    'status', 
    'createdAt',
  ],
  
  defaultLimit: 10,
};


