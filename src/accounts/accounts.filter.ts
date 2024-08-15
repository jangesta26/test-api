import { PaginateConfig  } from 'nestjs-paginate';
import { Accounts } from './entities/accounts.entity';

export const accountsPaginateConfig: PaginateConfig<Accounts> = {
  sortableColumns: ['id'],
  defaultSortBy: [['id', 'DESC']],
  searchableColumns: [
    'fname',
    'lname', 
    'email', 
    'username',
    'createdAt'
  ],

  relations: [
    'images',
    'logs',
  ]
  
};

