import { Router } from "express";
import { register, login, getProfile } from "../controllers/authController";
import { authenticate } from "../middleware/auth";

const authRouter = Router();

authRouter
   .post("/register", register)
   .post("/login", login)
   .get("/profile", authenticate, getProfile);

export default authRouter;
