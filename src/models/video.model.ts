import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: String,
    postId: String,
    url: String,
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;
