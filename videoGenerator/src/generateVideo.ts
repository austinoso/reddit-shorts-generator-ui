import { getPostData } from "./utils/reddit/posts.js";
import { editVideo, buildEditSpec } from "./utils/editor/editor.js";
import axios from "axios";

export async function generateVideo(postUrl) {
  const post = await getPostData(postUrl);
  const videoId = process.env.VIDEO_ID;

  await axios.put(`http://localhost:7777/api/videos/${videoId}`, {
    title: post.title.text,
    postId: post.id,
  });

  // edit video
  const editSpec = await buildEditSpec(post);
  await editVideo(editSpec);

  return post;
}
