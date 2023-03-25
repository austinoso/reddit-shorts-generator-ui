import { addToVideoQueue, stopWorker } from "../services/generateVideo.service";
import { Request, Response, NextFunction } from "express";

export async function process(req: Request, res: Response, next: NextFunction) {
  try {
    const { postUrl } = req.body;
    const job = await addToVideoQueue(postUrl);
    res.json({ message: "Added video to queue" });
  } catch (e) {
    console.log("Error creating video: ", e);
    next(e);
  }
}

export async function stop(req: Request, res: Response, next: NextFunction) {
  try {
    await stopWorker();
    res.json({ message: "Stopped video worker" });
  } catch (e) {
    console.log("Error stopping video worker: ", e);
    next(e);
  }
}
