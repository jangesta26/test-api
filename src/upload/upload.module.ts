import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadImage } from './entities/upload.entity';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UploadImage,
    ]),
    MulterModule.register({
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    }),
    AccountsModule,

  ],
  controllers: [UploadController],
  providers: [
    UploadService,
    CloudinaryService
  ],
  exports: [CloudinaryService],
})
export class UploadModule {}
