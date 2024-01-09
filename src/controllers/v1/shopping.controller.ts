import express, {Request, Response, NextFunction} from 'express';
import { FoodDoc, Offer, Restaurant } from '../../models';


export const getRestaurantsAvailable = async (req: Request, res: Response, next: NextFunction) => {
    const postalcode = req.params.postalcode;
    const result = await Restaurant.find({postalcode, serviceAvailable: true})
                                .sort([[ 'rating', 'descending']])
                                .populate('foods')
    if(result.length) {
        return res.status(200).json(result)
    }

    return res.status(400).json({message: "Data Not found"})
}

export const getTopRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    const postalcode = req.params.postalcode;
    const quantity = parseInt(req.params.quantity);

    const result = await Restaurant.find({postalcode, serviceAvailable: true})
                                .sort([[ 'rating', 'descending']])
                                .limit(quantity)
    if(result.length) {
        return res.status(200).json(result)
    }

    return res.status(400).json({message: "Data Not found"})
}

export const getFoodsIn30min = async (req: Request, res: Response, next: NextFunction) => {
    const postalcode = req.params.postalcode;

    const result = await Restaurant.find({postalcode, serviceAvailable: true}).populate('foods')
    if(result.length) {
        let foodResults: any = []
        result.map(restaurant => {
            const foods = restaurant.foods as [FoodDoc]
            foodResults.push(...foods.filter(food => food.readyTime <= 30))
        })

        return res.status(200).json(foodResults)
    }
    return res.status(400).json({message: "Data Not Found"})
}

export const searchFoods = async (req: Request, res: Response, next: NextFunction) => {
    const postalcode = req.params.postalcode;

    const result = await Restaurant.find({postalcode, serviceAvailable: true}).populate('foods')
    if(result.length) {
        let foodResults: any = []
        result.map(restaurant => foodResults.push(...restaurant.foods))

        return res.status(200).json(foodResults)
    }
    return res.status(400).json({message: "Data Not Found"})
}

export const getRestaurantByID = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = Restaurant.findById(id).populate('foods');

    if(result) return res.status(200).json(result);

    return res.status(400).json({message: "Data Not Found"})
}

export const getAvailableOffers =async (req: Request, res: Response, next: NextFunction) => {
    const postalcode = req.params.postalcode;

    const offers = await Offer.find({postalcode, isActive: true})
    if(offers) {
        return res.status(200).json(offers)
    }

    return res.status(400).json({ message: "Offers not found" })
}

