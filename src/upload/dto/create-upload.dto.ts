import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class CreateUploadImageProfileDto {
    @IsNotEmpty()
    @IsNotEmpty()
    acc_id: number;

    @IsNotEmpty()
    @IsString()
    imageUrl: string;

    @IsNotEmpty()
    @IsNotEmpty()
    status: number;

}
