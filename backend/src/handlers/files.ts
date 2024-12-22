import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getFiles(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    response.status(200).send([]);
}

export async function uploadFile(
    request: Request<{}, {}, { file: UploadedFile }>,
    response: Response<{ message: string }>,
    next: NextFunction,
): Promise<any> {
    const file = request.files?.file as UploadedFile;

    if (!file) {
        return response.status(400).send({ message: "No file uploaded" });
    }

    if (!file.name.endsWith(".zip")) {
        return response.status(400).send({ message: "Only .zip files are allowed." });
    }

    const tempZipPath = path.join(__dirname, "../../temp/uploads", file.name);
    const tempDir = path.join(__dirname, "../../temp/uploads");

    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    fs.writeFileSync(tempZipPath, file.data);

    try {
        const zip = new AdmZip(tempZipPath);
        zip.extractAllTo(tempDir);

        response.status(200).send({ message: "File uploaded successfully" });
    } catch (err: any) {
        response.status(500).send({ message: `Error extracting zip file: ${err.message}` });
    }
}
