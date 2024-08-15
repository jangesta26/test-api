import { PaginateConfig  } from 'nestjs-paginate';
import { UploadImage } from './entities/upload.entity';

export const uploadImagePaginateConfig: PaginateConfig<UploadImage> = {
  sortableColumns: ['uploadId'],
  defaultSortBy: [['uploadId', 'DESC']],
  searchableColumns: [
    'uploadId',
    'accountId', 
    'imageUrl',
    'status',
    'createdAt'
  ],
relations:[
  // 'account'
]
};


