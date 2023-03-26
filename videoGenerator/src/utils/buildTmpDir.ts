import fs from "fs";

export async function buildFileDir(postId: string) {
  const fileDir = `./output/${postId}`;
  const assetsDir = `${fileDir}/assets`;
  const commentsDir = `${assetsDir}/comments`;
  const commentsDirExists = fs.existsSync(commentsDir);

  if (!commentsDirExists) {
    fs.mkdirSync(commentsDir, { recursive: true });
  }

  return { fileDir, assetsDir };
}
