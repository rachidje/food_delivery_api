import mongoose, {Schema, Document} from "mongoose";

export interface OfferDoc extends Document {
    offerType: string; // RESTAURANT ou GENERIC
    restaurants: [any];
    title: string;
    description: string;
    minValue: number;
    offerAmount: number;
    startValidity: Date;
    endValidity: Date;
    promocode: string;
    promoType: string;
    postalcode: string;
    isActive: boolean;
}

const OfferSchema = new Schema({
    offerType: {type: String, required: true},
    restaurants: {type: [Schema.Types.ObjectId], ref: 'restaurant'},
    title: {type: String, required: true},
    description: String,
    minValue: {type: Number, required: true},
    offerAmount: {type: Number, required: true},
    startValidity: Date,
    endValidity: Date,
    promocode: {type: String, required: true},
    promoType: {type: String, required: true},
    postalcode: {type: String, required: true},
    isActive: Boolean
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v
        }
    },
    timestamps: true
})

const Offer = mongoose.model<OfferDoc>('offer', OfferSchema)

export { Offer }