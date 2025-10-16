import { Router } from "express";
import * as option from "../controllers/optionsController";
import { authenticate } from "../middleware/auth";

const optionsRouter = Router();

optionsRouter
    .post("/options", authenticate, option.createOptions)
    .patch("/options", authenticate, option.updateOptions)
    .get("/options", authenticate, option.getAllOptions)

export default optionsRouter;