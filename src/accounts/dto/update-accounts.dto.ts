import { PartialType } from '@nestjs/mapped-types';
import { CreateAccoountsDto } from './create-accounts.dto';

export class UpdateTodoDto extends PartialType(CreateAccoountsDto) {}
