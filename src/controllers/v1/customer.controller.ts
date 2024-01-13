import { plainToClass } from 'class-transformer';
import {Request, Response, NextFunction} from 'express';
import { CreateCustomerInputs, EditCustomerProfileInputs, UserLoginInputs } from '../../dto/Customer.dto';
import { validate } from 'class-validator';
import { generateOTP, generateSalt, generateSignature, hashPassword, isValidatedPassword, onRequestOTP } from '../../utility';
import { Customer, Food, Offer } from '../../models';
import { OrderInputs } from '../../dto/Order.dto';
import { Order } from '../../models/Order';

export const customerSignup = async (req: Request, res: Response, next: NextFunction) => {
    const customerInputs = plainToClass(CreateCustomerInputs, req.body);
    const inputErrors = await validate(customerInputs, {validationError: {target: true}})
    if(inputErrors.length) {
        return res.status(400).json(inputErrors);
    }

    const {email, phone, password} = customerInputs;

    const salt = await generateSalt();
    const hashedPassword = await hashPassword(password, salt)
    const {otp, otp_expiry} = generateOTP();

    const existingCustomer = await Customer.findOne({ email })

    if(existingCustomer) {
        return res.status(409).json({message: "An user exist with this email"})
    }

    const newCustomer = await Customer.create({
        email, password: hashedPassword, phone, salt, otp, otp_expiry, firstname: '', lastname: '', address: '', verified: false, lat: 0, long: 0
    })

    if(newCustomer) {
        //send the OTP to customer
        await onRequestOTP(otp, phone);

        // generate signature
        const signature = generateSignature({
            _id: newCustomer._id,
            email: newCustomer.email,
            verified: newCustomer.verified
        })

        // send the result to Client Side
        return res.status(201).json({signature, verified: newCustomer.verified, email: newCustomer.email})
    }

    return res.status(400).json({message: "Error with the signup..."})
}

export const customerLogin = async (req: Request, res: Response, next: NextFunction) => {
    const loginInputs = plainToClass(UserLoginInputs, req.body);
    const loginErrors = await validate(loginInputs, {validationError: {target: false}});
    
    if(loginErrors.length) {
        return res.status(400).json(loginErrors);
    }

    const {email, password} = loginInputs;
    const customer = await Customer.findOne({ email })

    if(customer) {
        const validation = await isValidatedPassword(password, customer.password, customer.salt);
        
        if (validation) {
            const signature = generateSignature({
                _id: customer._id,
                email: customer.email,
                verified: customer.verified
            })

            return res.status(201).json({signature, verified: customer.verified, email: customer.email})
        }

    }
    return res.status(404).json({message: "Error with the email and/or password provided."})
}

export const customerVerify = async (req: Request, res: Response, next: NextFunction) => {
    const {otp} = req.body;
    const customer = req.user;

    if(customer) {
        const profile = await Customer.findById(customer._id);
        if(profile) {
            if(profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
                profile.verified = true;
                const updatedCustomer = await profile.save();
                const signature = generateSignature({
                    _id: updatedCustomer._id,
                    email: updatedCustomer.email,
                    verified: updatedCustomer.verified
                })
                return res.status(201).json({ signature, verified: updatedCustomer.verified, email: updatedCustomer.email})
            }
            return res.status(400).json({message: "Error with the OTP provided or the OTP has expired"})
        }
    }

    return res.status(400).json({message: "Error with OTP validation"})
}

export const requestOtp = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;
    if(customer) {
        const profile = await Customer.findById(customer._id);
        if(profile) {
            const {otp, otp_expiry} = generateOTP();

            profile.otp = otp;
            profile.otp_expiry = otp_expiry;

            await profile.save();
            await onRequestOTP(otp, profile.phone);

            res.status(200).json({message: "OTP sent to your registered phone number."});
        }
    }
    return res.status(400).json({message: "Error with Request OTP"});
}

export const getCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;
    if(customer) {
        const profile = await Customer.findById(customer._id);
        if(profile) {
            return res.status(200).json(profile)
        }
    }
    return res.status(400).json({message: "Error with fetch profile"})
}

export const editCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;
    const profileInputs = plainToClass(EditCustomerProfileInputs, req.body)
    const profileErrors = await validate(profileInputs, { validationError: {target: false}});

    if (profileErrors.length) {
        return res.status(400).json(profileErrors)
    }

    const {firstname, lastname, address} = profileInputs;

    if(customer) {
        const profile = await Customer.findById(customer._id);
        if(profile) {
            profile.firstname = firstname;
            profile.lastname = lastname;
            profile.address = address;

            const result = await profile.save();

            return res.status(200).json(result);
        }
    }
}

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    // recuperer le current customer
    const customer = req.user;

    if(customer) {
        // creer un order ID
        const orderId = `${Math.floor(Math.random() * 899999) + 1000}`;
        const profile = await Customer.findById(customer._id);

        // recuperer les items de la commande [{id: XX, unit: XX}]
        const cart = <[OrderInputs]>req.body // [{id: XX, unit: XX}]

        let cartItems = Array();
        let netAmount = 0.0;
        let restaurantId;

        // calculer le montant de la commande
        const foods = await Food.find().where('_id').in(cart.map(item => item._id)).exec()
        
        foods.map(food => {
            cart.map(( {_id, unit} ) => {
                if(food._id == _id) {
                    restaurantId= food.restaurantId;
                    netAmount += (food.price * unit);
                    cartItems.push({food, unit})
                }
            })
        })
        // creer une commande avec la description des items
        if(cartItems.length) {
            const currentOrder = await Order.create({
                orderID: orderId,
                restaurantId,
                items: cartItems,
                totalAmount: netAmount,
                orderDate: new Date(),
                paidThrough: 'COD',
                paymentResponse: '',
                orderStatus: 'Waiting',
                remarks: '',
                deliveryId: '',
                appliedOffers: false,
                offerId: null,
                readyTime: 45
            })

            // mettre a jour les commandes passees sur le compte utilisateur
            if(currentOrder) {
                profile.cart = [] as any;
                profile.orders.push(currentOrder);
                const profileResponse = await profile.save();

                return res.status(200).json(profileResponse);
            }
        }
    }

    return res.status(400).json({message: "Error with Create Order"})
}

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;
    if(customer) {
        const profile = await Customer.findById(customer._id).populate('orders');
        if(profile) {
            return res.status(200).json(profile.orders);
        }
    }
}

export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.id;
    if(orderId) {
        const order = await Order.findById(orderId).populate('items.food');
        if(order) {
            return res.status(200).json(order);
        }
    }
}

export const verifyOffer = async (req: Request, res: Response, next: NextFunction) => {
    const offerId = req.params.id;
    const customer = req.user;

    if(customer) {
        const appliedOffer = await Offer.findById(offerId)
        
        if(appliedOffer && appliedOffer.promoType === 'USER') {
            // only can apply ONCE per USER
        } else {
            if(appliedOffer.isActive && appliedOffer.endValidity <= new Date()) {
                return res.status(200).json({message: "Offer is valid", offer: appliedOffer})
            }
        }

        return res.status(400).json({message: "Offer is not valid"})
    }
    return res.status(400).json({message: "Something wrong with the offer verification"})

}

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;

    if(customer) {
        const profile = await Customer.findById(customer._id).populate('cart.food')
        let cartItems = Array();

        const { _id, unit } = <OrderInputs>req.body;
        const food = await Food.findById(_id);

        if(food && profile) {
            cartItems = profile.cart;
            if (cartItems.length) {
                let existedFoodItem = cartItems.filter(item => item.food._id.toString() === _id)

                if(existedFoodItem) {
                    const index = cartItems.indexOf(existedFoodItem[0])
                    if(unit > 0){
                        cartItems[index] = {food, unit}
                    } else {
                        cartItems.splice(index, 1)
                    }
                } else {
                    cartItems.push({ food, unit })
                }
            } else {
                cartItems.push({ food, unit })
            }

            if (cartItems) {
                profile.cart = cartItems as any;
                const cartResult = await profile.save();
                return res.status(200).json(cartResult.cart);
            }
        }
    }

    return res.status(400).json({message: "Unable to create Cart!"})

}

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;
    if(customer) {
        const profile = await Customer.findById(customer._id).populate('cart.food');
        if(profile) {
            return res.status(200).json(profile.cart);
        }
    }
    return res.status(400).json({message: "Cart is empty"})
}

export const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;
    if(customer) {
        const profile = await Customer.findById(customer._id).populate('cart.food');
        if(profile) {
            profile.cart = [] as any;
            const cartResult = await profile.save()

            return res.status(200).json(cartResult);
        }
    }
    return res.status(400).json({message: "Cart is already empty"})
}

