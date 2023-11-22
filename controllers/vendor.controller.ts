import { NextFunction, Request, Response } from "express";
import { EditVendorInput, LoginVendorInput } from "../dto";
import { findVendor } from "./admin.controller";
import { generateSignature, isValidatedPassword } from "../utility";

export const vendorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <LoginVendorInput>req.body;
    const existingVendor = await findVendor(undefined, email);

    if(existingVendor) {
        const isValidPassword = await isValidatedPassword(password, existingVendor.password, existingVendor.salt)
        if (isValidPassword) {
            const signature = generateSignature({
                _id: existingVendor._id,
                email: existingVendor.email,
                name: existingVendor.name,
                foodTypes: existingVendor.foodTypes
            })
            return res.json(signature);
        }
        return res.json({message: "Password is not valid"}) 
    }

    return res.json({message: "Login credentials not valid"})
}

export const getVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    if(req.user) {
        const vendor = await findVendor(req.user._id);
        return res.json(vendor)
    }
    return res.json({message: "Vendor information not found"})
}

export const updateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const {name, address, phone, foodTypes} = <EditVendorInput>req.body;
    const user = req.user;

    if(user) {
        const vendor = await findVendor(user._id);
        if(vendor) {
            vendor.name = name;
            vendor.address = address;
            vendor.phone = phone;
            vendor.foodTypes = foodTypes;

            const savedVendor = await vendor.save();
            return res.json(savedVendor)
        }
        return res.json(vendor);
    }
    return res.json({message: "Vendor information not found"})
}

export const updateVendorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    
    if(user) {
        const vendor = await findVendor(user._id)
        if(vendor) {
            vendor.serviceAvailable = !vendor.serviceAvailable;
            const savedVendor = await vendor.save();
            return res.json(savedVendor)
        }
        return res.json(vendor);
    }
    return res.json({message: "Vendor information not found"})
}
