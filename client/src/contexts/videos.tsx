// build context for sharing and keeping video data

import { createContext, useContext, useEffect, useState } from "react";

export default interface IVideo {
  _id: string;
  name: string;
  title: string | undefined;
  postId: string | undefined;
  url: string;
  createdAt: string;
  status: string;
  updatedAt: string;
  __v: number;
}

interface IVideoContext {
  videos: IVideo[];
  setVideos: (videos: IVideo[]) => void;
  workingVideo: IVideo | undefined;
  setWorkingVideo: (video: IVideo) => void;
  workingProgress: number;
  setWorkingProgress: (progress: number) => void;
  isVideoProcessing: boolean;
  setIsVideoProcessing: (processing: boolean) => void;
}

const VideoContext = createContext<IVideoContext>({
  videos: [],
  setVideos: () => {},
  workingVideo: undefined,
  setWorkingVideo: () => {},
  workingProgress: 0,
  setWorkingProgress: () => {},
  isVideoProcessing: false,
  setIsVideoProcessing: () => {},
});

export const VideoProvider = ({ children }: any) => {
  // TODO change this to IVideo
  const [videos, setVideos] = useState<any[]>([]);

  const [workingVideo, setWorkingVideo] = useState<IVideo | undefined>(
    undefined
  );
  const [workingProgress, setWorkingProgress] = useState<number>(0);
  const [videoProcessing, setVideoProcessing] = useState<boolean>(false);

  const processingVideos = (videos: any) => {
    let processingVideos = videos.filter(
      (video: any) => video.status === "processing"
    );

    return processingVideos;
  };

  useEffect(() => {
    if (processingVideos(videos).length > 0) {
      setVideoProcessing(true);
    } else {
      setVideoProcessing(false);
    }
  }, [videos]);

  return (
    <VideoContext.Provider
      value={{
        videos,
        setVideos,
        workingVideo,
        setWorkingVideo,
        workingProgress,
        setWorkingProgress,
        isVideoProcessing: videoProcessing,
        setIsVideoProcessing: setVideoProcessing,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => useContext(VideoContext);
