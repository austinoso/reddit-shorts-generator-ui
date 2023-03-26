import { generateVideo } from "./src/generateVideo.js";

async function main() {
  const postUrl = process.env.POST;
  console.log("Generating video for post: ", postUrl);
  await generateVideo(postUrl);
}

main();
