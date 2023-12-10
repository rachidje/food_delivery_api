import { IsEmail, IsEmpty, Length } from "class-validator";

export class CreateCustomerInputs {
    @IsEmpty()
    @IsEmail()
    email: string;

    @Length(7, 12)
    phone: string;

    @Length(6, 12)
    password: string;
}