import { Request, Response } from "express";
import { Options } from "../models/options";
import { AuthRequest } from "../middleware/auth"; // Reuse shared interface

export const createOptions = async (req: Request, res: Response): Promise<void> => {
    const authReq = req as AuthRequest;

    try {
        const count = await Options.countDocuments({ userId: authReq.userId });

        if (count === 0) {
            const options = new Options({
                ...authReq.body,
                userId: authReq.userId,
            });
            const response = await options.save();
            res.status(201).json({ msg: "Options created", data: response });
            return 
        }
        res.status(409).json({ msg: "Options already created!" });
        return 
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateOptions = async (req: Request, res: Response): Promise<void> => {
    const authReq = req as AuthRequest;

    try {
        const { id, calories, salt } = authReq.body;

        const carbohydrates = Math.round((+calories * +authReq.body.carbohydrates) / 4);
        const fat = Math.round((+calories * +authReq.body.fat) / 9);
        const protein = Math.round((+calories * +authReq.body.protein) / 4);
        const saturatedFat = Math.round((+calories * +authReq.body.saturatedFat) / 9);
        const sugar = Math.round((+calories * +authReq.body.sugar) / 4);

        const response = await Options.findOneAndUpdate(
            { _id: id, userId: authReq.userId },
            { calories: +calories, carbohydrates, fat, protein, saturatedFat, sugar, salt: +salt },
            { new: true }
        );

        res.status(200).json({ msg: "Options updated", data: response });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getAllOptions = async (req: Request, res: Response): Promise<void> => {
    const authReq = req as AuthRequest;

    try {
        const data = await Options.find({ userId: authReq.userId });
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
};
