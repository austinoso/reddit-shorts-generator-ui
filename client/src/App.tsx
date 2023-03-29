import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Layout from "./components/common/Layout";
import VideoTable from "./components/VideoTable";
import VideoForm from "./components/VideoForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { useVideoContext } from "./contexts/videos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <VideoTable />,
  },
  {
    path: "/videos/:id",
    element: <VideoForm />,
  },
]);

const WS_URL = "ws://localhost:7778";

function App() {
  const { videos, setVideos } = useVideoContext();

  const handleGenerateVideoMessage = (messageData: any) => {
    const { status, videoId, error } = messageData;

    const video = videos.find((video) => video._id === videoId);
    console.log("video", video);
    if (!video) return;

    if (status === "closed") {
      video.status = "complete";
    }

    console.log("videos", videos);

    setVideos([...videos]);
  };

  useWebSocket(WS_URL, {
    onOpen: () => console.log("opened"),
    onClose: () => console.log("closed"),
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      console.log(data);

      if (data.type === "generateVideo") handleGenerateVideoMessage(data.data);
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
