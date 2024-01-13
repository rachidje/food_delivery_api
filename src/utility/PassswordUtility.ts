import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { AuthPayload } from '../dto/Auth.dto';
import { APP_SECRET } from '../config';

export const generateSalt = async () : Promise<string> => {
    return await bcrypt.genSalt()
}

export const hashPassword = async (password: string, salt: string) : Promise<string> => {
    return await bcrypt.hash(password, salt)
}

export const isValidatedPassword = async (enteredPassword: string, savedPassword: string, salt: string): Promise<boolean> => {
    return await hashPassword(enteredPassword, salt) === savedPassword;
}

export const generateSignature = (payload: AuthPayload) => {
    return jwt.sign(payload, process.env.APP_SECRET || APP_SECRET, {expiresIn: '1d'})
}

export const isValidSignature = async (req: Request) => {
    const signature = req.get('Authorization')
    if(signature) {
        const payload = jwt.verify(signature.split(' ')[1], process.env.APP_SECRET || APP_SECRET) as AuthPayload;
        req.user = payload;
        return true
    }
    return false;
}