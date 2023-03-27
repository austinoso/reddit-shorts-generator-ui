import { Request, Response, NextFunction } from "express";
import {
  createVideo,
  removeVideo,
  getAllVideos,
  getVideo,
} from "../services/videos.service";

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const video = await getVideo(id);

    res.json({
      ok: true,
      data: {
        video: video,
      },
    });
  } catch (e) {
    console.log("Error getting video: ", e);
    next(e);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { postUrl } = req.body;
    const video = await createVideo(postUrl);

    res.json({
      ok: true,
      addedToQueue: true,
      data: {
        video: video,
      },
    });
  } catch (e) {
    console.log("Error creating video: ", e);
    next(e);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    res.json({ message: "Updated video" });
  } catch (e) {
    console.log("Error updating video: ", e);
    next(e);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const video = await removeVideo(id);

    res.json({
      ok: true,
      data: {
        video: video,
      },
    });
  } catch (e) {
    console.log("Error removing video: ", e);
    next(e);
  }
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const videos = await getAllVideos();
    res.json({
      ok: true,
      data: {
        videos: videos,
      },
    });
  } catch (e) {
    console.log("Error getting all videos: ", e);
    next(e);
  }
}
