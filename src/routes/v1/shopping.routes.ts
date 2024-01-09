import express from 'express'
import { getAvailableOffers, getFoodsIn30min, getRestaurantById, getRestaurantsAvailable, getTopRestaurants, searchFoods } from '../../controllers/v1'
const router = express.Router()

/** --------------------------Food Availability ------------------------ */
router.get('/:postalcode', getRestaurantsAvailable)

/** --------------------------Top Restaurants - ------------------------ */
router.get('/top-restaurants/:postalcode/:quantity', getTopRestaurants)

/** --------------Foods Available in 30 minutes ------------------------ */
router.get('/foods-in-30-min/:postalcode', getFoodsIn30min)

/** --------------------------Search Foods ----------------------------- */
router.get('/search/:postalcode', searchFoods);

/** --------------------    Find Offers ------------------------------- */
router.get('/offers/:postalcode', getAvailableOffers);

/** --------------------------Find Restautant By ID -------------------- */
router.get('/show/:id', getRestaurantById)

export { router as ShoppingRoute }