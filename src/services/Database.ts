import mongoose from 'mongoose';
import { MONGO_URI_DEV } from '../config/db';

export default async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || MONGO_URI_DEV)
    } catch (error) {
        console.log(error)
    }
}