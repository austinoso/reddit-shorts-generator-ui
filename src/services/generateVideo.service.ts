// import { generateVideo } from "../controllers";
import { Queue } from "bullmq";
// import videoWorker from "../";

// const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
const REDIS_PORT = process.env.REDIS_PORT
  ? parseInt(process.env.REDIS_PORT)
  : 0 || 6379;

const redisOptions = {
  host: REDIS_HOST,
  port: REDIS_PORT,
};

const videoQueue = new Queue("videoJobQueue", {
  connection: redisOptions,
});

export async function addToVideoQueue(postUrl: string) {
  // let videoQueue = new Queue("videoJobQueue", REDIS_URL);

  // let job = await videoQueue.add(
  //   { postUrl: postUrl },
  //   { removeOnComplete: true, removeOnFail: true }
  // );

  // videoQueue.process(async (job, done) => {
  //   const { postUrl } = job.data;
  //   console.log("Generating video for post: ", postUrl);
  //   await sleep(5000);
  //   done();
  //   console.log("Done!");
  // });

  // generate random string for video name (for now)
  const videoName = Math.random().toString(36).substring(7);

  await videoQueue.add(
    videoName,
    { postUrl: postUrl },
    { removeOnComplete: true, removeOnFail: true }
  );
}

export async function stopWorker() {
  console.log("Stopping video worker...");
  // await videoWorker.close();
}
