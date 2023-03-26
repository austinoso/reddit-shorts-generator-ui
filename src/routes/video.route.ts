import { Router } from "express";
import { process, stop } from "../controllers/generateVideo.controller";
import { get, create, update, remove } from "../controllers/videos.controller";

const videoRouter = Router();

videoRouter.post("/generate", process);
videoRouter.post("/stop", stop);
videoRouter.get("/", get);
videoRouter.post("/", create);
videoRouter.put("/", update);
videoRouter.delete("/", remove);

export default videoRouter;
