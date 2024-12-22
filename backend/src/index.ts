import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import FilesRouter from "./routers/files.ts";
import cors from "cors";

const app = express();

app.use(cors());
app.use(fileUpload());
app.use("/api/files", FilesRouter);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
});
