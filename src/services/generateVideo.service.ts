// import { generateVideo } from "../controllers";
import createWorker from "../../workers/generateVideo.worker";

let worker: any;

export async function startWorker(postUrl: string) {
  console.log("Starting video worker...");

  if (worker) return worker;
  console.log("Creating worker...");
  worker = await createWorker(postUrl);
}

export async function stopWorker() {
  console.log("Stopping video worker...");
  if (worker) {
    // worker.stdin.pause();
    await worker.kill();
    worker = null;
  }
}
