import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateAccoountsDto {

    @IsNotEmpty()
    fname: string;

    @IsNotEmpty()
    lname: string;

    @IsNotEmpty()
    gender: string;

    @IsNotEmpty()
    dob: Date;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    status: number;

    @IsNotEmpty()
    createdAt: Date;

}
