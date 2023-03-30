import { startWorker, stopWorker } from "../services/generateVideo.service";
import { Request, Response, NextFunction } from "express";

export async function process(req: Request, res: Response, next: NextFunction) {
  try {
    const { videoId } = req.body;
    const worker = await startWorker(videoId);
    res.json({ message: "Added video to queue", workerId: worker.pid });
  } catch (e) {
    console.log("Error creating video: ", e);
    next(e);
  }
}

export async function stop(req: Request, res: Response, next: NextFunction) {
  try {
    await stopWorker();
    res.json({ message: "Stopped video worker", error: null });
  } catch (e) {
    res.json({ message: "Error stopping video worker", error: e });
    console.log("Error stopping video worker: ", e);
    next(e);
  }
}
