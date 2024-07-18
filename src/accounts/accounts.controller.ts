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
import { Paginate, PaginateQuery, Paginated, } from 'nestjs-paginate';
import { Accounts } from './entities/accounts.entity';


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
  

    @Get('member')
    async findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Accounts>> {
      try{
        return this.accountsService.findAll(query);
      }catch (error) {
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
