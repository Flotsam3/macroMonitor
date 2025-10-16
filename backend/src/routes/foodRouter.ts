import { Router } from "express";
import * as food from "../controllers/nutrientsController";
import { productSchema } from "../schemas/newProductSchema";
import { validateSchema } from "../middleware/schema-validation";
import { authenticate } from "../middleware/auth";

const foodRouter = Router();

foodRouter
    .post("/food", authenticate, productSchema, validateSchema, food.createFood)
    .get("/food", authenticate, food.getAllFood)
    .put("/food/images/:id", authenticate, food.uploadImage)
    .delete("/food", authenticate, food.deleteFoodItem)

export default foodRouter;