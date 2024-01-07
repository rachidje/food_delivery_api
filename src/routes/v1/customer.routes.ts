import express from "express";
import { addToCart, createOrder, customerLogin, customerSignup, customerVerify, deleteCart, editCustomerProfile, getCart, getCustomerProfile, getOrderById, getOrders, requestOtp } from "../../controllers/v1";
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

/** Panier */
router.post('/cart', addToCart)
router.get('/cart', getCart)
router.delete('/cart', deleteCart)

/** Order */
router.post('/create-order', createOrder);
router.get('/orders', getOrders);
router.get('/order/:id', getOrderById);


export {router as CustomerRoute}