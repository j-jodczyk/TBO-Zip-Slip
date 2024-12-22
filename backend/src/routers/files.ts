import { Router } from "express";
import { getFiles, uploadFile } from "../handlers/files.ts";

const router = Router();

router.get("/", getFiles);

router.post("/", uploadFile);

export default router;
