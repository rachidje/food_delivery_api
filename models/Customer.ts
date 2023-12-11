import mongoose, { Date, Document, Schema } from "mongoose";

interface CustomerDoc extends Document {
    email: string;
    password: string;
    salt: string;
    firstname: string;
    lastname: string;
    address: string;
    phone: string;
    verified: boolean;
    otp: number;
    otp_expiry: Date;
    lat: number;
    long: number;
}

const CustomerSchema = new Schema<CustomerDoc>({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    salt: {type: String, required: true},
    firstname: {type: String},
    lastname: {type: String},
    address: {type: String},
    phone: {type: String, required: true},
    verified: {type: Boolean, required: true},
    otp: {type: Number, required: true},
    otp_expiry: {type: Date, required: true},
    lat: {type: Number},
    long: {type: Number},
}, {
    toJSON: {
        transform(doc, ret, options) {
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    },
    timestamps: true
})

const Customer = mongoose.model('customer', CustomerSchema)

export {Customer}