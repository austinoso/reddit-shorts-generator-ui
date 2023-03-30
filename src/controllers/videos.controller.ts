import { Request, Response, NextFunction } from "express";
import {
  createVideo,
  removeVideo,
  getAllVideos,
  getVideo,
  updateVideo,
} from "../services/videos.service";
import { sendWSMessage } from "../wsServer";

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
    const video = await createVideo(req.body);

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
    const { id } = req.params;
    const video = await updateVideo(id, req.body);

    await sendWSMessage({
      type: "UPDATE_VIDEO",
      data: {
        video: video,
      },
    });

    res.json({
      message: "Updated video",
      data: {
        video: video,
      },
    });
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
