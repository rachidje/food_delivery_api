import express, { Request } from "express";
import { addFood, getFoods, getRestaurantProfile, updateRestaurantCoverImage, updateRestaurantProfile, updateRestaurantService, restaurantLogin } from "../../controllers/v1";
import { authenticate } from "../../middlewares";
import { imagesMiddleware } from "../../middlewares/uploadImages";
const router = express.Router()

router.post('/login', restaurantLogin);

router.use(authenticate)
router.get('/profile', getRestaurantProfile)
router.patch('/profile', updateRestaurantProfile)
router.patch('/coverimage', imagesMiddleware, updateRestaurantCoverImage)
router.patch('/service', updateRestaurantService)

router.post('/food', imagesMiddleware, addFood)
router.get('/foods', getFoods)

export {router as RestaurantRoute }