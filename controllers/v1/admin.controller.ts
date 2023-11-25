import {Request, Response, NextFunction} from 'express';
import { CreateRestaurantInput } from '../../dto';
import { Restaurant } from '../../models';
import { generateSalt, hashPassword } from '../../utility';

export const findRestaurant = async (id: string | undefined, email?: string) => {
    if(email) {
        return Restaurant.findOne({email: email}).exec()
    }
    return Restaurant.findById(id).exec();
}

export const createRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    const body = <CreateRestaurantInput>req.body

    const existingRestaurant = await findRestaurant('', body.email)
    if(existingRestaurant) {
        return res.json({message: `A restaurant is existing with the same email '${body.email}'`})
    }

    const salt = await generateSalt();
    const hashedPassword = await hashPassword(body.password, salt)

    const newRestaurant = new Restaurant({
        ...body, salt: salt, password: hashedPassword, rating: 0, serviceAvailable: false, coverImages: [], foods: []
    })
    await newRestaurant.save();
    return res.json(newRestaurant);
}

export const getRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    const restaurants = await Restaurant.find({})
    if(restaurants) return res.json(restaurants)

    return res.json({message: "No restaurant available"})
}

export const getRestaurantById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const restaurant = await findRestaurant(id)
    if(restaurant) return res.json(restaurant)

    return res.json({message: "No restaurant available with this ID"})
}