import { getPostData } from "./utils/reddit/posts.js";
import { editVideo, buildEditSpec } from "./utils/editor/editor.js";

export async function generateVideo(postUrl) {
  const post = await getPostData(postUrl);

  // edit video
  const editSpec = await buildEditSpec(post);
  await editVideo(editSpec);

  return post;
}
