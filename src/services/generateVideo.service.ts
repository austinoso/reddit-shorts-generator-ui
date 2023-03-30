// import { generateVideo } from "../controllers";
import createWorker from "../../workers/generateVideo.worker";
import Video from "../models/video.model";
import { sendWSMessage } from "../wsServer";
import { updateVideo } from "./videos.service";

let worker: any;

export async function startWorker(videoId: string) {
  console.log("Starting video worker...");

  const video = await Video.findById(videoId);
  if (!video) return { error: "Video not found" };

  if (worker) return worker;
  console.log("Creating worker...");

  worker = await createWorker(video.url, video._id.toString());

  worker.on("close", async (code: any) => {
    console.log(`child process exited with code ${code}`);
    worker = null;

    let error = null;
    if (code !== 0) {
      error = "Error generating video";
    }

    const video = await updateVideo(videoId, {
      status: error ? "error" : "complete",
    });

    sendWSMessage({
      type: "generateVideo",
      data: {
        status: "closed",
        video: video,
        error: error,
      },
    });
  });

  return worker;
}

export async function stopWorker() {
  console.log("Stopping video worker...");
  if (worker) {
    // worker.stdin.pause();
    await worker.kill();
    worker = null;
  }
}
