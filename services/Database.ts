import mongoose from 'mongoose';
import { MONGO_URI } from '../config/db';

export default async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("✅ Mongodb connection established")
    } catch (error) {
        console.log(error)
    }
}