import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { VideoProvider } from "./contexts/videos";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <VideoProvider>
      <App />
    </VideoProvider>
  </React.StrictMode>
);
