import editly from "editly";
import { getVideoDurationInSeconds } from "get-video-duration";
import * as dotenv from "dotenv";
import Xvfb from "xvfb";
dotenv.config();

export async function editVideo(editSpec: any) {
  const xvfb = new Xvfb();
  xvfb.startSync();
  await editly(editSpec);
  xvfb.stopSync();
}

export async function buildEditSpec(post) {
  const { layers, duration, audioTracks } = await buildTracks(post);

  // remove special characters from title
  let postTitle = post.title.text.replace(/[^a-zA-Z0-9 ]/g, "");
  // replace spaces with dashes
  postTitle = postTitle.replace(/ /g, "-");

  const videoLayer = await buildVideoLayer(
    process.env.VIDEO_BACKGROUND,
    duration
  );

  const editSpec = {
    outPath: `${post.fileDir}/${postTitle}.mp4`,
    height: 1920,
    width: 1080,
    outputVolume: "14dB",
    defaults: {
      layerType: { "fill-color": { color: "#00aa00" } },
    },
    clips: [
      {
        layers: [videoLayer, ...layers],
        duration: duration,
      },
    ],
    audioTracks: audioTracks,
  };

  return editSpec;
}

async function buildTracks(post) {
  const layers = [];
  const audioTracks = [];

  const titleLayer = {
    type: "image-overlay",
    path: post.title.image,
    stop: post.title.duration,
  };

  layers.push(titleLayer);
  audioTracks.push(buildAudioTrack(post.title.audio, 0));

  let runningDuration = titleLayer.stop;
  for (let i = 0; i < post.comments.length; i++) {
    const comment = post.comments[i];

    const commentLayer = {
      type: "image-overlay",
      path: comment.image,
      start: runningDuration,
      stop: comment.duration + runningDuration,
    };

    layers.push(commentLayer);

    const audioTrack = buildAudioTrack(comment.audio, runningDuration);
    audioTracks.push(audioTrack);

    runningDuration += comment.duration;
  }

  return { layers, duration: runningDuration, audioTracks };
}

async function buildVideoLayer(videoPath: string, duration: number) {
  const bkgVideolength = await getVideoDurationInSeconds(videoPath);
  const bkgVideoStart = Math.random() * (bkgVideolength - duration);

  return {
    type: "video",
    path: videoPath,
    cutFrom: bkgVideoStart,
    cutTo: bkgVideoStart + duration,
  };
}

function buildAudioTrack(path, start) {
  return {
    path: path,
    start: start,
  };
}
