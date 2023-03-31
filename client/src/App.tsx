import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Layout from "./components/common/Layout";
import VideoTable from "./components/VideoTable";
import VideoForm from "./components/VideoForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { useVideoContext } from "./contexts/videos";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/videos/:id",
    element: <VideoForm />,
  },
]);

const WS_URL = "ws://localhost:7778";

function App() {
  const { videos, setVideos, setWorkingProgress, setWorkingVideo } =
    useVideoContext();

  // TODO: this needs to be refactored
  const handleGenerateVideoMessage = (messageData: any) => {
    const { status, video, error } = messageData;

    // replace updated video in videos array
    const videoIndex = videos.findIndex((v) => v._id === video._id);
    if (videoIndex !== -1) {
      videos[videoIndex] = video;
    }

    setWorkingVideo(videos[videoIndex]);
    setVideos([...videos]);
  };

  const handleGenerateVideoProgressMessage = (messageData: any) => {
    const { progress } = messageData;
    setWorkingProgress(parseInt(progress));
  };

  useWebSocket(WS_URL, {
    onOpen: () => console.log("opened"),
    onClose: () => console.log("closed"),
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      console.log(data);

      if (data.type === "generateVideo" || data.type === "UPDATE_VIDEO")
        handleGenerateVideoMessage(data.data);

      if (data.type === "generateVideoProgress") {
        handleGenerateVideoProgressMessage(data.data);
      }
    },
  });

  return (
    <div className="App">
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </div>
  );
}

export default App;
