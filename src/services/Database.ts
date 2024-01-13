import mongoose from 'mongoose';
import priv from '../config';

export default async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || priv.MONGO_URI_DEV)
    } catch (error) {
        console.log(error)
    }
}