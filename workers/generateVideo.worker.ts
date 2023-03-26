import { spawn } from "child_process";

async function createWorker(postUrl: string) {
  const child = spawn(
    "cd " +
      __dirname +
      "/../" +
      " && " +
      `POST=${postUrl} node videoGenerator/dist/main.js`,
    { shell: true }
  );

  // console log pid
  console.log("child process pid: ", child.pid);

  child.stdout.on("data", (data: any) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data: any) => {
    console.error(`stderr: ${data}`);
  });

  child.on("close", (code: any) => {
    console.log(`child process exited with code ${code}`);
  });

  return child;
}

export default createWorker;
