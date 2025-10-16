import { Router } from "express";
import * as consumption from "../controllers/consumptionController";
import { authenticate } from "../middleware/auth";

const consumptionRouter = Router();

consumptionRouter
    .post("/consumption", authenticate, consumption.createConsumption)
    .get("/consumption", authenticate, consumption.getConsumption)
    .delete("/consumption/:id", authenticate, consumption.deleteConsumptionItem)
    .delete("/consumption", authenticate, consumption.deleteConsumption)

export default consumptionRouter;