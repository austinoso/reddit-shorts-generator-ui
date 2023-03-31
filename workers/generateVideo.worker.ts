import { spawn } from "child_process";
import { sendWSMessage } from "../src/wsServer";

async function createWorker(postUrl: string, id: string) {
  const child = spawn(
    "cd " +
      __dirname +
      "/../" +
      " && " +
      `POST=${postUrl} VIDEO_BACKGROUND=./assets/mc-bkg-video.mp4 VIDEO_ID=${id} node videoGenerator/dist/main.js`,
    { detached: true, shell: true }
  );

  // console log pid
  console.log("child process pid: ", child.pid);

  child.stdout.on("data", (data: any) => {
    let progress = data.toString().trim();
    if (progress.endsWith("%")) {
      // remove the % sign
      progress = progress.slice(0, -1);
      console.log("progress: ", progress);

      sendWSMessage({
        type: "generateVideoProgress",
        data: {
          progress: progress,
        },
      });
    } else {
      console.log("data: ", data.toString());
    }
  });

  child.stderr.on("data", (data: any) => {
    console.error(`stderr: ${data}`);
  });

  return child;
}

export default createWorker;
