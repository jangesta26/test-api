import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { paginateConfig } from './images.filter';
import { Images } from './entities/images.entity';
import { CreateImageProfileDto } from './dto/create-images.dto';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(Images)
        private readonly imagesRepository: Repository<Images>,
    ) {}

    async create(createImageProfileDto: CreateImageProfileDto): Promise<Images> {
        const newImage = this.imagesRepository.create(createImageProfileDto);
        return await this.imagesRepository.save(newImage);
    }
    
    async findAll(query: PaginateQuery): Promise<Paginated<Images>> {
        return paginate(query, this.imagesRepository, paginateConfig);
    }

    async queryBuilder(alias: string) {
        return this.imagesRepository.createQueryBuilder(alias);
    }

    async findOne(id: number): Promise<Images> {
        const image = await this.imagesRepository.findOne({ where: { id } });
        if (!image) {
            throw new NotFoundException(`Image with ID ${id} not found`);
        }
        return image;
    }

    async update(id: number, updateImagesDto: CreateImageProfileDto): Promise<Images> {
        const image = await this.imagesRepository.findOne({ where: { id } });
        if (!image) {
            throw new NotFoundException(`Image with ID ${id} not found`);
        }
        Object.assign(image, updateImagesDto);
        return await this.imagesRepository.save(image);
    }

    async delete(id: number): Promise<void> {
        const image = await this.imagesRepository.findOne({ where: { id } });
        if (!image) {
            throw new NotFoundException(`Image with ID ${id} not found`);
        }
        await this.imagesRepository.remove(image);
    }
}
