import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateUsersLogsDto {

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsNumber()
    status: number;

}
