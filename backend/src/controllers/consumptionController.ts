import { Request, Response } from "express";
import { Consumption } from "../models/consumption";
import { AuthRequest } from "../middleware/auth"; // Reuse shared interface

export const createConsumption = async (req: Request, res: Response): Promise<void> => {
    const authReq = req as AuthRequest;

    try {
        const itemsWithUserId = authReq.body.map((item: any) => ({
            ...item,
            userId: authReq.userId,
        }));

        const consumption = await Consumption.insertMany(itemsWithUserId);
        res.status(201).json({ msg: "Consumption created", data: consumption });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getConsumption = async (req: Request, res: Response): Promise<void> => {
    const authReq = req as AuthRequest;

    try {
        const data = await Consumption.find({ userId: authReq.userId });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteConsumptionItem = async (req: Request, res: Response): Promise<void> => {
    const authReq = req as AuthRequest;

    try {
        await Consumption.findOneAndDelete({
            _id: authReq.params.id,
            userId: authReq.userId,
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteConsumption = async (req: Request, res: Response): Promise<void> => {
    const authReq = req as AuthRequest;

    try {
        await Consumption.deleteMany({ userId: authReq.userId });
        res.status(204).end();
    } catch (error) {
        res.status(500).send(error);
    }
};
