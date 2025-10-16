import {Schema, model} from "mongoose";

type FoodItem = {
    userId:string
    name:string
    calories:number
    carbohydrates:number
    fat:number
    protein:number
    saturatedFat:number
    sugar:number
    salt:number
    image:string
}

const foodSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true },
    calories: { type: Number, required: true, min: 0 },
    carbohydrates: { type: Number, required: true, min: 0 },
    fat: { type: Number, required: true, min: 0 },
    protein: { type: Number, required: true, min: 0 },
    saturatedFat: { type: Number, required: true, min: 0 },
    sugar: { type: Number, required: true, min: 0 },
    salt: { type: Number, required: true, min: 0 },
    image: { type: String }
},
  { timestamps: true });

foodSchema.index({userId: 1, name: 1}, {unique: true}); // makes name unique per user, not globally

export const Food = model<FoodItem>("Food", foodSchema)