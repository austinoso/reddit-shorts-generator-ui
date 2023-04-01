// import { generateVideo } from "../controllers";
import createWorker from "../../workers/generateVideo.worker";
import Video from "../models/video.model";
import { sendWSMessage } from "../wsServer";
import { updateVideo } from "./videos.service";

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

    const video = await updateVideoStatusWithCloseCode(videoId, code);

    sendWSMessage({
      type: "generateVideo",
      data: {
        status: "closed",
        video: video,
        error: error,
      },
    });
  });

  return { worker: worker, video: video };
}

export async function stopWorker() {
  console.log("Stopping video worker...:" + worker.pid);
  if (worker) {
    process.kill(-worker.pid);
    worker = null;
  }
}

async function updateVideoStatusWithCloseCode(videoId: string, code: number) {
  let newStatus = "error";
  if (code === 0) newStatus = "complete";
  if (code === null) newStatus = "new";

  const video = await updateVideo(videoId, {
    status: newStatus,
  });

  return video;
}
