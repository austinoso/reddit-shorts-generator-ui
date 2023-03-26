import { Request, Response, NextFunction } from "express";

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    res.json({ message: "Hello World!" });
  } catch (e) {
    console.log("Error getting video: ", e);
    next(e);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { postUrl } = req.body;
    res.json({ message: "Added video to queue" });
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
    res.json({ message: "Removed video" });
  } catch (e) {
    console.log("Error removing video: ", e);
    next(e);
  }
}
