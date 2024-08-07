import { PaginateConfig  } from 'nestjs-paginate';
import { Images } from './entities/images.entity';

export const paginateConfig: PaginateConfig<Images> = {
  sortableColumns: ['id'],
  searchableColumns: [
    'id',
    'acc_id',
    'status', 
    'createdAt'
  ],

  select: [
    'id',
    'acc_id',
    'status', 
    'createdAt'
  ],
};


