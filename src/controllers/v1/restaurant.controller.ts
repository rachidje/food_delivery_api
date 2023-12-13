import { NextFunction, Request, Response } from "express";
import { EditRestaurantInput, LoginRestaurantInput } from "../../dto";
import { findRestaurant } from "./admin.controller";
import { generateSignature, isValidatedPassword } from "../../utility";
import { createFoodInputs } from "../../dto/Food.dto";
import { Food } from "../../models";

export const restaurantLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <LoginRestaurantInput>req.body;
    const existingRestaurant = await findRestaurant(undefined, email);

    if(existingRestaurant) {
        const isValidPassword = await isValidatedPassword(password, existingRestaurant.password, existingRestaurant.salt)
        if (isValidPassword) {
            const signature = generateSignature({
                _id: existingRestaurant._id,
                email: existingRestaurant.email,
                name: existingRestaurant.name,
                foodTypes: existingRestaurant.foodTypes
            })
            return res.json(signature);
        }
        return res.json({message: "Password is not valid"}) 
    }

    return res.json({message: "Login credentials not valid"})
}

export const getRestaurantProfile = async (req: Request, res: Response, next: NextFunction) => {
    if(req.user) {
        const restaurant = await findRestaurant(req.user._id);
        return res.json(restaurant)
    }
    return res.json({message: "Restaurant information not found"})
}

export const updateRestaurantProfile = async (req: Request, res: Response, next: NextFunction) => {
    const {name, address, phone, foodTypes} = <EditRestaurantInput>req.body;
    const user = req.user;

    if(user) {
        const restaurant = await findRestaurant(user._id);
        if(restaurant) {
            restaurant.name = name;
            restaurant.address = address;
            restaurant.phone = phone;
            restaurant.foodTypes = foodTypes;

            const savedRestaurant = await restaurant.save();
            return res.json(savedRestaurant)
        }
        return res.json(restaurant);
    }
    return res.json({message: "Restaurant information not found"})
}

export const updateRestaurantService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    
    if(user) {
        const restaurant = await findRestaurant(user._id)
        if(restaurant) {
            restaurant.serviceAvailable = !restaurant.serviceAvailable;
            const savedRestaurant = await restaurant.save();
            return res.json(savedRestaurant)
        }
        return res.json(restaurant);
    }
    return res.json({message: "Restaurant information not found"})
}

export const updateRestaurantCoverImage = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if(user) {
        const restaurant = await findRestaurant(user._id);

        if(restaurant) {
            const files = req.files as [Express.Multer.File];
            const images = files.map( (file: Express.Multer.File) => file.filename  )
            restaurant.coverImages.push(...images);
            const result = await restaurant.save();
            return res.json(result)
        }
    }

    return res.json({message: "Something went wrong with update cover images"})
}

export const addFood = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if(user) {
        const body = <createFoodInputs>req.body;
        const restaurant = await findRestaurant(user._id)

        if(restaurant) {
            const files = req.files as [Express.Multer.File]
            const images = files.map((file: Express.Multer.File) => file.filename)

            const createdFood = await Food.create({
                ...body, restaurantId: restaurant._id, rating: 0, images: images
            })
            
            restaurant.foods.push(createdFood);
            const result = await restaurant.save()

            return res.json(result);
        }

    }

    return res.json({message: "Something went wrong with add food"})
}

export const getFoods = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if(user) {
        const foods = await Food.find({restaurantId: user._id})
        if(foods) return res.json(foods);
    }

    return res.json({message: "Foods information not found"})
}