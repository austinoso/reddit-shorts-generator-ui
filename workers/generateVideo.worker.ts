import { spawn } from "child_process";

async function createWorker(postUrl: string, id: string) {
  const child = spawn(
    "cd " +
      __dirname +
      "/../" +
      " && " +
      `POST=${postUrl} VIDEO_ID=${id} node videoGenerator/dist/main.js`,
    { detached: true, shell: true }
  );

  // console log pid
  console.log("child process pid: ", child.pid);

  child.stdout.on("data", (data: any) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data: any) => {
    console.error(`stderr: ${data}`);
  });

  return child;
}

export default createWorker;
