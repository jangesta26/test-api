import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor(private configService: ConfigService) {
    const cloudName = this.configService.get<string>('CLOUD_NAME');
    const apiKey = this.configService.get<string>('CLOUD_API_KEY');
    const apiSecret = this.configService.get<string>('CLOUD_API_SECRET');

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error('Cloudinary credentials are not properly configured.');
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<{ secure_url: string }> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          this.logger.error('Error uploading image to Cloudinary', error.stack);
          reject(error);
        } else {
          this.logger.log('Image uploaded successfully', result.secure_url);
          resolve(result);
        }
      }).end(file.buffer); // End the upload stream with the file buffer
    });
  }
}
