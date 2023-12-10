import { plainToClass } from 'class-transformer';
import express, {Request, Response, NextFunction} from 'express';
import { CreateCustomerInputs } from '../../dto/Customer.dto';
import { validate } from 'class-validator';

export const customerSignup = async (req: Request, res: Response, next: NextFunction) => {
    const customerInputs = plainToClass(CreateCustomerInputs, req.body);
    const inputErrors = await validate(customerInputs, {validationError: {target: true}})
    if(inputErrors.length) {
        return res.status(400).json(inputErrors);
    }
}

export const customerLogin = async (req: Request, res: Response, next: NextFunction) => {

}

export const customerVerify = async (req: Request, res: Response, next: NextFunction) => {

}

export const requestOtp = async (req: Request, res: Response, next: NextFunction) => {

}

export const getCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

}

export const editCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {

}
