import { IsEmail, Length } from "class-validator";

export class CreateCustomerInputs {
    @IsEmail()
    email: string;

    @Length(7, 15)
    phone: string;

    @Length(6, 15)
    password: string;
}

export interface CustomerPayload {
    _id: string;
    email: string;
    verified: boolean
}

export class UserLoginInputs {
    @IsEmail()
    email: string;

    @Length(6, 15)
    password: string;
}