import { ConflictException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateAccoountsDto } from './dto/create-accounts.dto';
import { Accounts } from './entities/accounts.entity';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { accountsPaginateConfig } from './accounts.filter';

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Accounts)
        private readonly accountsRepository: Repository<Accounts>,
    ) {}

    async create(accountsDto: CreateAccoountsDto): Promise<Accounts> {
        const email = accountsDto.email;

            // Check if email already exists
        const existingAccount = await this.accountsRepository.findOne({ where: { email } });

        if (existingAccount) {
        throw new ConflictException('Email already exists');
        }

        const newAccount = this.accountsRepository.create(accountsDto);
        return await this.accountsRepository.save(newAccount);
    }

    
    findAll(query: PaginateQuery): Promise<Paginated<Accounts>> {
        return paginate(query, this.accountsRepository, accountsPaginateConfig);
    }

    
    async queryBuilder(alias: string) {
        return this.accountsRepository.createQueryBuilder(alias);
    }


    findOne(id: number): Promise<Accounts> {
        const accounts = this.accountsRepository
        .createQueryBuilder('accounts')
        .leftJoinAndSelect('accounts.images', 'images', 'images.status = :status', { status: 1 })
        .select([
            'accounts.id',
            'accounts.fname',
            'accounts.lname',
            'accounts.gender',
            'accounts.dob',
            'accounts.email',
            'accounts.username',
            'accounts.status',
            'accounts.createdAt',
            'images.imageUrl'
        ])
        .where('accounts.id = :id', { id })
        .getOne();
        if (!accounts) {
            throw new NotFoundException(`Account with ID ${id} not found`);
        }
        return accounts;
    }

    async update(id: number, updateAccountsDto: CreateAccoountsDto): Promise<Accounts> {
        const account = await this.accountsRepository.findOne({ where: { id } });
        if (!account) {
            throw new NotFoundException(`Account with ID ${id} not found`);
        }
        Object.assign(account, updateAccountsDto); 
        return await this.accountsRepository.save(account);
    }

    async delete(id: number): Promise<void> {
        const account = await this.accountsRepository.findOne({ where: { id } });
        if (!account) {
            throw new NotFoundException(`Account with ID ${id} not found`);
        }
        await this.accountsRepository.remove(account);
    }

    async findByUsername(username: string): Promise<Accounts | undefined> {
        const accounts = await this.accountsRepository
        .createQueryBuilder('accounts')
        .leftJoinAndSelect('accounts.images', 'images', 'images.status = :status', { status: 1 })
        .where('accounts.username = :username', { username })
        .getOne();
        if (!accounts) {
            throw new NotFoundException(`Account with ID ${username} not found`);
        }
        console.log(accounts)
        return accounts;
    }

}
