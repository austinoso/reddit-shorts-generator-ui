import mongoose, { Document } from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    postId: String,
    url: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["new", "processing", "complete", "error"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", videoSchema);

export async function resetVideos() {
  // set all videos status to new if they are not complete or error

  const videos = await Video.find({
    status: { $nin: ["complete", "error"] },
  });

  for (let i = 0; i < videos.length; i++) {
    console.log("resetting video: " + videos[i]._id);
    const video = videos[i];
    video.status = "new";
    await video.save();
  }
}

export interface IVideo extends Document {
  name: string;
  title: string;
  postId: string;
  url: string;
  status: string;
}

export default Video;
