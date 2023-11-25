import express from "express";
import { createRestaurant, getRestaurantById, getRestaurants } from "../../controllers/v1";
const router = express.Router()

router.post('/restaurant', createRestaurant);
router.get('/restaurant', getRestaurants);
router.get('/restaurant/:id', getRestaurantById)

export {router as AdminRoute }