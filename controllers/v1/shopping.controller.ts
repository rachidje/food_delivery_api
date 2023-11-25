import express, {Request, Response, NextFunction} from 'express';
import { Restaurant } from '../../models';


export const getFoodAvailable = async (req: Request, res: Response, next: NextFunction) => {
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

}

export const searchFoods = async (req: Request, res: Response, next: NextFunction) => {

}

export const getRestaurantByID = async (req: Request, res: Response, next: NextFunction) => {

}

