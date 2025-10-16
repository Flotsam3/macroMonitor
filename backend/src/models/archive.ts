import {Schema, model} from "mongoose";

type ArchiveItem = {
    userId:string
    date:string
    grams:number
    calories:number
    carbohydrates:number
    fat:number
    protein:number
    saturatedFat:number
    sugar:number
    salt:number
}

const archiveSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    date: { type: Date, required: true },
    grams: { type: Number, required: true, min: 0 },
    calories: { type: Number, required: true, min: 0 },
    carbohydrates: { type: Number, required: true, min: 0 },
    fat: { type: Number, required: true, min: 0 },
    protein: { type: Number, required: true, min: 0 },
    saturatedFat: { type: Number, required: true, min: 0 },
    sugar: { type: Number, required: true, min: 0 },
    salt: { type: Number, required: true, min: 0 }
},
  { timestamps: true });

// Ensure one archive per user per day
archiveSchema.index({ userId: 1, date: 1 }, { unique: true });

export const Archive = model<ArchiveItem>("Archive", archiveSchema)