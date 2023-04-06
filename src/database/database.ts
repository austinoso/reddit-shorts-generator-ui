import mongoose, { Connection } from "mongoose";
import { resetVideos } from "../models/video.model";

let db: Connection;

export const connectMongo = async () => {
  const uri =
    process.env.MONGO_URI || "mongodb://localhost:27017/reddit-video-generator";

  if (db) {
    return;
  }

  await mongoose.connect(uri);

  db = await mongoose.connection;

  await resetVideos();
  console.log("Connected to MongoDB");
};

// export const disconnectMongo = () => {
//   if (!db) {
//     return;
//   }

//   Mognoose.disconnect();
// };
