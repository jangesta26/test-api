import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateImageProfileDto {
    @IsNotEmpty()
    @IsNotEmpty()
    acc_id: number;

    @IsNotEmpty()
    @IsString()
    img: string;

    @IsNotEmpty()
    @IsNumber()
    status: number;

    @IsNotEmpty()
    @IsDate()
    createdAt: Date;

}
