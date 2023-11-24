import express from "express";
import { addFood, getFoods, getVendorProfile, updateVendorProfile, updateVendorService, vendorLogin } from "../../controllers/v1";
import { authenticate } from "../../middlewares";
const router = express.Router()

router.post('/login', vendorLogin);

router.use(authenticate)
router.get('/profile', getVendorProfile)
router.patch('/profile', updateVendorProfile)
router.patch('/service', updateVendorService)

router.post('/food', addFood)
router.get('/foods', getFoods)

export {router as VenderRoute }