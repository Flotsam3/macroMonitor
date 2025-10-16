import express from "express";
import dotenv from "dotenv";
dotenv.config();
import foodRouter from "./routes/foodRouter";
import optionsRouter from "./routes/optionsRouter";
import consumptionRouter from "./routes/consumptionRouter";
import archiveRouter from "./routes/archiveRouter";
import authRouter from "./routes/authRouter";
import "./utils/mongodb";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/", authRouter);
app.use("/api/", foodRouter);
app.use("/api/", optionsRouter);
app.use("/api/", consumptionRouter);
app.use("/api/", archiveRouter);

app.listen(PORT, ()=>{
    console.log(`Server is listening on port: ${PORT}`);
});
