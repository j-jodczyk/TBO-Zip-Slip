import { Router } from "express";
import { getFiles, uploadFile } from "../handlers/files.js";

const router = Router();

router.get("/", getFiles);

router.post("/", uploadFile);

export default router;
