import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { uploadImagePaginateConfig } from './upload.filter';
import { UploadImage } from './entities/upload.entity';
import { CreateUploadImageProfileDto } from './dto/create-upload.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UploadService {
    constructor(
        @InjectRepository(UploadImage)
        private readonly uploadRepository: Repository<UploadImage>,
        private readonly cloudinaryService: CloudinaryService ,
    ) {}

    async create(createImageProfileDto: CreateUploadImageProfileDto): Promise<UploadImage> {
        const newImage = this.uploadRepository.create(createImageProfileDto);
    
        // Validate that necessary fields are present
        if (!newImage.accountId || !newImage.imageUrl) {
          throw new ConflictException('Required fields are missing');
        }
    
        try {
          return await this.uploadRepository.save(newImage);
        } catch (error) {
          throw new ConflictException('Error creating image profile');
        }
      }

    findAll(query: PaginateQuery): Promise<Paginated<UploadImage>> {
      const qb = this.uploadRepository.createQueryBuilder('uploadImage')
      .where('uploadImage.status != :status', { status: 0 });
        return paginate(query, qb, uploadImagePaginateConfig);
    }

    async handleFileUpload(file: Express.Multer.File, accountId: number): Promise<{ url: string }> {
      if (!file) {
        throw new ConflictException('No file uploaded');
      }
  
      try {
        // Upload image to Cloudinary
        const result = await this.cloudinaryService.uploadImage(file);
        
        // Set previous images' status to 0 (inactive)
        await this.uploadRepository.update({ accountId, status: 1 }, { status: 0 });
    
        // Save image details to database
        const newImage = new UploadImage();
        newImage.accountId = accountId;
        newImage.imageUrl = result.secure_url;
        newImage.status = 1;
    
        // Save the new image record
        await this.uploadRepository.save(newImage);
    
        return { url: result.secure_url };
      } catch (error) {
        throw new InternalServerErrorException('Upload failed');
      }
    }
}
