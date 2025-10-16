import { Router } from "express";
import * as archive from "../controllers/archiveController";
import { authenticate } from "../middleware/auth";

const archiveRouter = Router();

archiveRouter
    .post("/archive", authenticate, archive.createArchive)
    .get("/archive", authenticate, archive.getArchive)
    .delete("/archive/:id", authenticate, archive.deleteArchiveItem)
    .delete("/archive", authenticate, archive.deleteArchive)

export default archiveRouter;