import { Request, Response } from "express";
import { Archive } from "../models/archive";
import { AuthRequest } from "../middleware/auth"; // Reuse the shared AuthRequest interface

export const createArchive = async (req: Request, res: Response): Promise<void> => {
    const authReq = req as AuthRequest;

    try {
        const archive = new Archive({
            ...authReq.body,
            userId: authReq.userId,
        });
        await archive.save();
        res.status(201).json({ msg: "Archive item created", data: archive });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getArchive = async (req: Request, res: Response): Promise<void> => {
    const authReq = req as AuthRequest;

    try {
        const data = await Archive.find({ userId: authReq.userId });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteArchiveItem = async (req: Request, res: Response): Promise<void> => {
    const authReq = req as AuthRequest;

    try {
        await Archive.findOneAndDelete({
            _id: authReq.params.id,
            userId: authReq.userId,
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteArchive = async (req: Request, res: Response): Promise<void> => {
    const authReq = req as AuthRequest;

    try {
        await Archive.deleteMany({ userId: authReq.userId });
        res.status(204).end();
    } catch (error) {
        res.status(500).send(error);
    }
};
