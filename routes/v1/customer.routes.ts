import express from "express";
import { customerLogin, customerSignup, customerVerify, editCustomerProfile, getCustomerProfile, requestOtp } from "../../controllers/v1";
import { authenticate } from "../../middlewares";
const router = express.Router()

/** Signup / Create customer */
router.get('/signup', customerSignup)

/** Login */
router.post('/login', customerLogin)

// Authentication
router.use(authenticate)

/** Verify customer account */
router.patch('/verify', customerVerify)

/** OTP / Requestiong OTP */
router.get('/otp', requestOtp)

/** Profile */
router.get('/profile', getCustomerProfile)

router.patch('/profile', editCustomerProfile)



export {router as CustomerRoute}