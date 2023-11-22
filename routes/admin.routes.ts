import express, {Request, Response, NextFunction} from "express";
import { createVendor, getVendorById, getVendors } from "../controllers";
const router = express.Router()

router.post('/vendor', createVendor);
router.get('/vendor', getVendors);
router.get('/vendor/:id', getVendorById)

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({message: 'Home from Admin'})
}) 

export {router as AdminRoute }