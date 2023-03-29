// build context for sharing and keeping video data

import { createContext, useContext, useState } from "react";

export default interface IVideo {
  _id: string;
  name: string;
  title: string | null;
  postId: string | null;
  url: string;
  createdAt: string;
  status: string;
}

interface IVideoContext {
  videos: IVideo[];
  setVideos: (videos: IVideo[]) => void;
}

const VideoContext = createContext<IVideoContext>({
  videos: [],
  setVideos: () => {},
});

export const VideoProvider = ({ children }: any) => {
  const [videos, setVideos] = useState<IVideo[]>([]);

  return (
    <VideoContext.Provider value={{ videos, setVideos }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => useContext(VideoContext);
