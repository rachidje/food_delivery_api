export * from './admin.routes';
export * from './vendor.routes';

import express from "express";
import { AdminRoute } from './admin.routes';
import { VenderRoute } from './vendor.routes';
const router = express.Router()

router.use('/admin', AdminRoute)
router.use('/vendor', VenderRoute)

export {router as v1Route }