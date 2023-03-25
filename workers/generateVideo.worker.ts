import { Worker } from "bullmq";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const workerHandler = async (job: any) => {
  console.log("Generating video for post: " + job.data.postUrl);
  await sleep(15000);
  console.log("Done!");
};

const workerOptions = {
  connection: {
    host: "localhost",
    port: 6379,
  },
};

const videoWorker = new Worker("videoJobQueue", workerHandler, workerOptions);

console.log("Worker started!");
