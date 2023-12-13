import mongoose from 'mongoose';
import { MONGO_URI } from '../config/db';

export default async () => {
    try {
        await mongoose.connect(MONGO_URI)
    } catch (error) {
        console.log(error)
    }
}