import { Router } from "express";
import { process, stop } from "../controllers/generateVideo.controller";
import {
  get,
  create,
  update,
  remove,
  getAll,
} from "../controllers/videos.controller";

const videoRouter = Router();

videoRouter.post("/generate", process);
videoRouter.post("/stop", stop);

videoRouter.get("/", getAll);
videoRouter.get("/:id", get);
videoRouter.post("/", create);
videoRouter.put("/:id", update);
videoRouter.delete("/:id", remove);

export default videoRouter;
