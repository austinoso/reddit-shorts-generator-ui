import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Layout from "./components/common/Layout";
import VideoTable from "./components/VideoTable";
import VideoForm from "./components/VideoForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { VideoProvider } from "./contexts/videos";

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

function App() {
  return (
    <div className="App">
      <VideoProvider>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </VideoProvider>
    </div>
  );
}

export default App;
