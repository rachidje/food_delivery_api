import mongoose, {Schema, Document, Model} from "mongoose";

export interface RestaurantDoc extends Document {
    name: string;
    ownerName: string;
    foodTypes: [string];
    postalcode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: boolean;
    coverImages: [string];
    rating: number;
    foods: any;
}

const RestaurantSchema = new Schema<RestaurantDoc>({
    name: {type: String, required: true},
    ownerName: {type: String, required: true},
    foodTypes: {type: [String]},
    postalcode: {type: String, required: true},
    address: {type: String},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    salt: {type: String, required: true},
    serviceAvailable: {type: Boolean},
    coverImages: {type: [String]},
    rating: {type: Number},
    foods: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'food'
    },
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

const Restaurant = mongoose.model<RestaurantDoc>('restaurant', RestaurantSchema);

export { Restaurant }