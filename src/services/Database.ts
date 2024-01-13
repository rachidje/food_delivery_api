import mongoose from 'mongoose';

let priv;

if(process.env.NODE_ENV && process.env.NODE_ENV === 'dev'){
    priv = require('../config')
}

export default async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || priv.MONGO_URI_DEV)
    } catch (error) {
        console.log(error)
    }
}