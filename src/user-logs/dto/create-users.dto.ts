import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateUsersLogsDto {

    @IsNotEmpty()
    @IsNumber()
    accountId: number;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsNumber()
    status: number;

}
