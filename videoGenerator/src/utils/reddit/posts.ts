import axios from "axios";
import { Post, Comment } from "../../../types/post";
import { textToSpeech } from "../google/textToSpeech.js";
import Screenshoter from "../../Screenshoter.js";
import { buildFileDir } from "../buildTmpDir.js";
import fs from "fs";
import { getAudioDurationInSeconds } from "get-audio-duration";

export async function getPostData(url): Promise<Post> {
  const jsonUrl = `${url}.json?sort=top`;

  const resData = await axios.get(jsonUrl);

  const postData = resData.data[0].data.children[0].data;
  const commentsData = resData.data[1].data.children;

  // sort comments by top
  commentsData.sort((a, b) => b.data.score - a.data.score);

  const screenshoter = new Screenshoter();
  await screenshoter.init(`${url}?sort=top`);

  const { fileDir, assetsDir } = await buildFileDir(postData.name);
  const title = await buildTitle(postData, screenshoter, assetsDir);

  const { comments, duration } = await buildComments(
    postData,
    commentsData,
    screenshoter,
    title,
    assetsDir
  );

  await screenshoter.close();

  return {
    title: title,
    id: postData.name,
    comments: comments,
    duration: duration,
    fileDir: fileDir,
  };
}

async function buildTitle(postData, screenshoter, assetsDir) {
  // get title image audio
  const titleAudioPath = `${assetsDir}/title.mp3`;

  if (!fs.existsSync(titleAudioPath))
    await textToSpeech(postData.title, titleAudioPath);
  const titleDuration = await getAudioDurationInSeconds(titleAudioPath);

  // get title image
  const { path: titleImagePath } = await screenshoter.takeScreenshotOfTitle(
    assetsDir
  );

  const title = {
    text: postData.title,
    audio: titleAudioPath,
    duration: titleDuration,
    image: titleImagePath,
  };

  return title;
}

async function buildComments(
  postData,
  commentsData,
  screenshoter,
  title,
  assetsDir
) {
  const comments: Comment[] = [];

  let runningAudioDuration = title.duration;
  for (let i = 0; i < commentsData.length; i++) {
    const comment = commentsData[i].data;

    // skip unusable comments
    if (!comment.body) continue;
    if (comment.body === "[deleted]") continue;
    if (comment.body === "[removed]") continue;
    if (comment.body.length > 800) continue;

    // get comment audio
    const audioPath = `${assetsDir}/comments/${comment.name}.mp3`;

    if (!fs.existsSync(audioPath)) await textToSpeech(comment.body, audioPath);
    const duration = await getAudioDurationInSeconds(audioPath);

    if (runningAudioDuration + duration >= 60) break; // max 60 seconds
    runningAudioDuration += duration;

    // get comment image
    const { path } = await screenshoter.takeScreenshotOfComment(
      comment.name,
      assetsDir
    );

    comments.push({
      body: comment.body,
      id: comment.name,
      audio: audioPath,
      image: path,
      duration: duration,
    });

    if (comments.length >= 20) break; // max 20 comments (we shouldn't be here anyway)
  }

  return { comments: comments, duration: runningAudioDuration };
}
