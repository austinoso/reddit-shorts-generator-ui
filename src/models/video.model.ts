import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    name: String,
    title: String,
    postId: String,
    url: String,
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

export default Video;
