import { Router } from "express";
import { process, stop } from "../controllers/generateVideo.controller";

const videoRouter = Router();

videoRouter.post("/generate", process);
videoRouter.post("/stop", stop);

export default videoRouter;
