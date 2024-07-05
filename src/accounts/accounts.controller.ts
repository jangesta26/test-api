import { 
  Body, 
  ConflictException, 
  Controller, 
  Delete, 
  Get, 
  HttpException, 
  HttpStatus, 
  Param, 
  Post, 
  Put, 
  Req,
  Query
 } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccoountsDto } from './dto/create-accounts.dto';
import { Request } from 'express';

@Controller('accounts')
export class AccountsController {

    constructor(private readonly accountsService: AccountsService) {}

    @Post()
    async createAccount(@Body() accountsDto: CreateAccoountsDto) {
      try{
        return await this.accountsService.create(accountsDto);
      }catch (error){
        if (error instanceof ConflictException) {
          throw new HttpException(error.message, HttpStatus.CONFLICT);
        } else {
          throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
     
    }
  
    @Get()
    async frontend(){
      return this.accountsService.all();
    }

    @Get('member')
    async backend(
        @Req() req: Request,
        @Query('s') searchValue?: string,
        @Query('page') page = 1,
        @Query('perPage') perPage = 10,
        @Query('sort') sort?: string,
    ) {
        try {
            const builder = await this.accountsService.queryBuilder('accounts');

            // Apply search filter if searchValue is provided
            if (searchValue) {
                builder.where(`accounts.fname LIKE :search OR accounts.lname LIKE :search OR accounts.email LIKE :search OR accounts.username LIKE :search`, { search: `%${searchValue}%` });
            }

            // Apply sorting
            if (sort) {
                const sortOrder: 'ASC' | 'DESC' = sort.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
                builder.orderBy('accounts.fname', sortOrder);
            }

            // Get total count before pagination
            const totalCount = await builder.getCount();

            // Calculate total_pages based on totalCount and perPage
            const total_pages = Math.ceil(totalCount / perPage);

            // Calculate offset and ensure it doesn't exceed totalCount
            const offset = (page - 1) * perPage;
            if (offset >= totalCount && total_pages > 0) {
                throw new HttpException(`Page ${page} does not exist. Please enter a valid page number.`, HttpStatus.BAD_REQUEST);
            }

            // Apply pagination
            builder.offset(offset).limit(perPage);

            // Fetch data
            const data = await builder.getMany();

            return {
                data,
                totalCount,
                page: page, // Ensure page number is correctly parsed as a number
                perPage,
                total_pages,
                sort: sort || 'ASC', // Default sort direction if not provided
            };
        } catch (error) {
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.accountsService.findOne(+id);
    }
  
    @Put(':id')
    update(@Param('id') id: number, @Body() updateAccountsDto: CreateAccoountsDto) {
      return this.accountsService.update(id, updateAccountsDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.accountsService.delete(id);
    }
}
