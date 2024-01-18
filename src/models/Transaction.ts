import mongoose, { Document, Schema } from "mongoose";


export interface TransactionDoc extends Document {
    customer: any;
    restaurant: any;
    order: any;
    orderAmount: string;
    offer: any;
    status: string;
    paymentMode: string;
    paymentResponse: string;
}

const TransactionSchema = new Schema<TransactionDoc>({
    customer: {type: Schema.Types.ObjectId, ref: 'customer'},
    restaurant: {type: Schema.Types.ObjectId, ref: 'restaurant', default: null},
    order: {type: Schema.Types.ObjectId, ref: 'order', default: null},
    orderAmount: {type: String},
    offer: {type: Schema.Types.ObjectId, ref: 'offer', default: null},
    status: {type: String, default: 'OPEN'},
    paymentMode: {type: String},
    paymentResponse: {type: String, default: 'Payment is Cash On Delivery'},
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret, options) {
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    }
})

const Transaction = mongoose.model<TransactionDoc>('transaction', TransactionSchema)

export { Transaction }