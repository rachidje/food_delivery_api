import mongoose, {Schema, Document, Model} from "mongoose";

interface FoodDoc extends Document {
    restaurantId: string;
    name: string;
    description: string;
    category: string;
    foodType: string;
    readyTime: number;
    price: number;
    rating: number;
    images: [string]
}

const FoodSchema = new Schema({
    restaurantId: String,
    name: {type: String, required: true},
    description: {type: String, required: true},
    category: String,
    foodType: {type: String, required: true},
    readyTime: {type: Number},
    price: {type: Number, required: true},
    rating: Number,
    images: [String],
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

const Food = mongoose.model<FoodDoc>('food', FoodSchema)

export { Food };