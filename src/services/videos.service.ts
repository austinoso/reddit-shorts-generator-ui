import IVideo from "../types/video.type";
import Video from "../models/video.model";

export async function getVideo(id: string) {
  console.log("get video: " + id);

  const video = await Video.findById(id);
  return video;
}

export async function getAllVideos() {
  console.log("get all videos");

  const videos = await Video.find();
  return videos;
}

export async function createVideo(video: IVideo) {
  console.log("create video");

  const newVideo = new Video(video);
  await newVideo.save();

  return newVideo;
}

export async function updateVideo(video: any) {
  console.log("update video");
}

export async function removeVideo(id: string) {
  console.log("remove video: " + id);

  const video = await Video.findByIdAndDelete(id);
  return video;
}
