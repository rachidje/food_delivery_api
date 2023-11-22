import { NextFunction, Request, Response } from "express";
import { AuthPayload } from "../dto/Auth.dto";
import { isValidSignature } from "../utility";

declare global {
    namespace Express {
        interface Request{
            user?: AuthPayload
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const isValid = await isValidSignature(req);
    if(isValid) {
        next()
    } else {
        return res.status(401).json({message: "User not Authorized"})
    }
}