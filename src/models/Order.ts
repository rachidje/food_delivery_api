import mongoose, {Schema, Document} from "mongoose";

export interface OrderDoc extends Document {
    orderID: string; // 5567574
    items: [any]; // [{food, unit: 1}]
    totalAmount: number;
    orderDate: Date;
    paidThrough: string; // Cash on delivery (COD), Credit Card, Wallet
    paymentResponse: string; // {status: true, response: from bank}
    orderStatus: string;
}

const OrderSchema = new Schema({
    orderID: {type: String, required: true}, 
    items: [
        {
            food: {type: Schema.Types.ObjectId, ref: "food", required: true},
            unit: {type: Number, required: true}
        }
    ],
    totalAmount: {type: Number, required: true},
    orderDate: Date,
    paidThrough: String,
    paymentResponse: String,
    orderStatus: String
}, {
    toJSON: {
        transform(doc, ret, options) {
            delete ret.__v,
            delete ret.createdAt,
            delete ret.updatedAt
        }
    },
    timestamps: true
})

const Order = mongoose.model<OrderDoc>('order', OrderSchema);

export { Order };