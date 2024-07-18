import { PaginateConfig  } from 'nestjs-paginate';
import { Accounts } from './entities/accounts.entity';

export const filteringConfig: PaginateConfig<Accounts> = {
  sortableColumns: ['id'],
  nullSort: 'last',
  defaultSortBy: [['id', 'ASC']],
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
  
  // maxLimit: 5,
  defaultLimit: 10,
};


