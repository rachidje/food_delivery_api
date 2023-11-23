import {Request, Response, NextFunction} from 'express';
import { CreateVendorInput } from '../../dto';
import { Vendor } from '../../models';
import { generateSalt, hashPassword } from '../../utility';

export const findVendor = async (id: string | undefined, email?: string) => {
    if(email) {
        return Vendor.findOne({email: email}).exec()
    }
    return Vendor.findById(id).exec();
}

export const createVendor = async (req: Request, res: Response, next: NextFunction) => {
    const body = <CreateVendorInput>req.body

    const existingVendor = await findVendor('', body.email)
    if(existingVendor) {
        return res.json({message: `A vendor is existing with the same email '${body.email}'`})
    }

    const salt = await generateSalt();
    const hashedPassword = await hashPassword(body.password, salt)

    const newVendor = new Vendor({
        ...body, salt: salt, password: hashedPassword, rating: 0, serviceAvailable: false, coverImages: []
    })
    await newVendor.save();
    return res.json(newVendor);
}

export const getVendors = async (req: Request, res: Response, next: NextFunction) => {
    const vendors = await Vendor.find({})
    if(vendors) return res.json(vendors)

    return res.json({message: "No vendor available"})
}

export const getVendorById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const vendor = await findVendor(id)
    if(vendor) return res.json(vendor)

    return res.json({message: "No vendor available with this ID"})
}