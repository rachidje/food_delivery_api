import { plainToClass } from 'class-transformer';
import express, {Request, Response, NextFunction} from 'express';
import { CreateCustomerInputs } from '../../dto/Customer.dto';
import { validate } from 'class-validator';
import { generateOTP, generateSalt, generateSignature, hashPassword, onRequestOTP } from '../../utility';
import { Customer } from '../../models';

export const customerSignup = async (req: Request, res: Response, next: NextFunction) => {
    const customerInputs = plainToClass(CreateCustomerInputs, req.body);
    const inputErrors = await validate(customerInputs, {validationError: {target: true}})
    if(inputErrors.length) {
        return res.status(400).json(inputErrors);
    }

    const {email, phone, password} = customerInputs;

    const salt = await generateSalt();
    const hashedPassword = await hashPassword(password, salt)
    const {otp, otp_expiry} = generateOTP();

    const newCustomer = await Customer.create({
        email, password: hashedPassword, phone, salt, otp, otp_expiry, firstname: '', lastname: '', address: '', verified: false, lat: 0, long: 0
    })

    if(newCustomer) {
        //send the OTP to customer
        await onRequestOTP(otp, phone);

        // generate signature
        const signature = generateSignature({
            _id: newCustomer._id,
            email: newCustomer.email,
            verified: newCustomer.verified
        })

        // send the result to Client Side
        return res.status(201).json({signature, verified: newCustomer.verified, email: newCustomer.email})
    }

    return res.status(400).json({message: "Error with the signup..."})
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
