import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccoountsDto } from './dto/create-accounts.dto';
import { Accounts } from './entities/accounts.entity';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';
import { filteringConfig } from './accounts.filter';

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

    
    async findAll(query:PaginateQuery): Promise<Paginated<Accounts>> {
        return paginate(query, this.accountsRepository,filteringConfig)
          
      }






      
    async queryBuilder(alias: string) {
        return this.accountsRepository.createQueryBuilder(alias);
    }


    async findOne(id: number): Promise<Accounts> {
        const accounts = await this.accountsRepository.findOne({ where: { id } });
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
}
