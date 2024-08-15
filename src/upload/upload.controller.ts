import { 
  Body, 
  Controller, 
  Post, 
  UseInterceptors, 
  UploadedFile, 
  BadRequestException,
  Get,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { UploadImage } from './entities/upload.entity';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
  ) {}

  @Post('image-profile')
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 10 * 1024 * 1024 }, // Set size limit to 20MB
  }))
  async uploadImageProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body('accountId') accountId: number
  ) {
    if (!file || !accountId) {
      throw new BadRequestException('File and accountId are required');
    }
    
    return this.uploadService.handleFileUpload(file, accountId);
  }

  @Get('image-records')
  async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<UploadImage>> {
    try{
      return this.uploadService.findAll(query);
    }catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
   
  }
}
