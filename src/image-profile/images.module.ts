import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from './entities/images.entity';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Images,
    ]),
    MulterModule.register({
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    }),

  ],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule {}
