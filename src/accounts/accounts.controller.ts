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
    async findOne(@Param('id') id: string): Promise<Accounts> {
      try {
        const account = await this.accountsService.findOne(+id);
        if (!account) {
          throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
        }
        return account;
      } catch (error) {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateAccountsDto: CreateAccoountsDto) {
      try {
        const updatedAccount = await this.accountsService.update(id, updateAccountsDto);
        if (!updatedAccount) {
          throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
        }
        return { statusCode: HttpStatus.OK, data: updatedAccount };
      } catch (error) {
        if (error instanceof ConflictException) {
          throw new HttpException(error.message, HttpStatus.CONFLICT);
        } else {
          throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    }
  
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.accountsService.delete(id);
    }
}
