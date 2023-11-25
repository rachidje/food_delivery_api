import express from 'express'
import { getFoodAvailable, getFoodsIn30min, getRestaurantById, getTopRestaurants, searchFoods } from '../../controllers/v1'
const router = express.Router()

/** --------------------------Food Availability ------------------------ */
router.get('/:postalcode', getFoodAvailable)

/** --------------------------Top Restaurants - ------------------------ */
router.get('/top-restaurants/:postalcode/:quantity', getTopRestaurants)

/** --------------Foods Available in 30 minutes ------------------------ */
router.get('/foods-in-30-min/:postalcode', getFoodsIn30min)

/** --------------------------Search Foods ----------------------------- */
router.get('/search/:postalcode', searchFoods);

/** --------------------------Find Restautant By ID -------------------- */
router.get('/restaurant/:id', getRestaurantById)

export { router as ShoppingRoute }