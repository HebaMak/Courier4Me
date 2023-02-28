import express from "express";

import { uploadedPhoto } from "../controllers/photo.js";

export const photoRouter = express.Router();

photoRouter.post("/upload", uploadedPhoto);

export default photoRouter;
