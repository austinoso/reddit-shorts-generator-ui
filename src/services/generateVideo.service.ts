// import { generateVideo } from "../controllers";
import createWorker from "../../workers/generateVideo.worker";
import Video from "../models/video.model";
import { sendWSMessage } from "../wsServer";
import { updateVideo } from "./videos.service";
import { exec } from "child_process";

let worker: any;

export async function startWorker(videoId: string) {
  console.log("Starting video worker...");

  const video = await updateVideo(videoId, {
    status: "processing",
  });

  if (!video) return { error: "Video not found" };

  sendWSMessage({
    type: "generateVideo",
    data: {
      status: "running",
      video: video,
    },
  });

  if (worker) return worker;
  console.log("Creating worker... " + worker);

  worker = await createWorker(video.url, video._id.toString());

  worker.on("close", async (code: any) => {
    console.log(`child process exited with code ${code}`);
    worker = null;

    let error = null;
    if (code !== 0 && code !== null) {
      error = "Error generating video";
    }

    let newStatus = "";
    if (code === 0) newStatus = "complete";
    if (code === null) newStatus = "new";
    if (error !== null) newStatus = "error";

    const video = await updateVideo(videoId, {
      status: newStatus,
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
  console.log("Stopping video worker...:" + worker.pid);
  if (worker) {
    process.kill(-worker.pid);
    worker = null;
  }
}
