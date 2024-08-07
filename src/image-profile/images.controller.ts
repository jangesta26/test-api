import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  HttpException, 
  HttpStatus, 
  Param, 
  Post, 
  Put, 
  UseInterceptors, 
  UploadedFile,
  BadRequestException, 
  ParseIntPipe
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { CreateImageProfileDto } from './dto/create-images.dto';
import { Images } from './entities/images.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {

    constructor(private readonly imagesService: ImagesService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
      limits: { fileSize: 2 * 1024 * 1024 }, // Set size limit to 2MB
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() createImageDto: CreateImageProfileDto) {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }
  
      const image = new Images();
      image.acc_id = +createImageDto.acc_id;
      image.img = file.filename; // You may want to store the file path or URL instead
      image.status = +createImageDto.status;
      image.createdAt = new Date(createImageDto.createdAt);
  
      return await this.imagesService.create(image);
    }

    @Get()
    async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Images>> {
      try {
        return await this.imagesService.findAll(query);
      } catch (error) {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Images> {
      return await this.imagesService.findOne(id);
    }

    @Put(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateImagesDto: CreateImageProfileDto
    ): Promise<Images> {
      return await this.imagesService.update(id, updateImagesDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return await this.imagesService.delete(id);
    }
}
