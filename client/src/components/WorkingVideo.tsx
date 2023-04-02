import { useVideoContext } from "../contexts/videos";
import { startVideoProcessing, stopVideoProcessing } from "../utils/videoAPI";
import { useEffect } from "react";

export default function WorkingVideo() {
  const { workingVideo, workingProgress, setWorkingVideo, videos } =
    useVideoContext();

  if (!workingVideo) return null;

  useEffect(() => {
    // get video in progress and set it as working video
    const video = videos.find((video) => video.status === "processing");
    if (video) {
      setWorkingVideo(video);
    }
  }, [videos]);

  const handleButton = async () => {
    if (workingVideo.status === "processing") {
      await stopVideoProcessing();
    } else if (workingVideo.status === "complete") {
      console.log("view");
    } else {
      await startVideoProcessing(workingVideo._id);
    }
  };

  const startButton = (status: string) => {
    let buttonText = "Start";
    let buttonClass =
      "inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ";
    let buttonColors =
      "bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600";

    if (status === "processing") {
      buttonText = "Stop";
      buttonColors =
        "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600";
    }

    if (status === "complete") {
      buttonText = "View";
    }

    return (
      <button
        type="button"
        className={`${buttonColors} ${buttonClass}`}
        onClick={handleButton}
      >
        {buttonText}
      </button>
    );
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Video In Progress: {workingVideo ? workingVideo.name : "None"}
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>{workingVideo ? workingVideo.title : "..."}</p>
              <p>
                Progress:{" "}
                {workingProgress ? `${workingProgress}%` : "initializing"}
              </p>
              {workingVideo && (
                <p>
                  <a
                    href={workingVideo.url}
                    className="font-medium text-blue-600 hover:text-blue-500 py-4"
                  >
                    View Post
                  </a>
                </p>
              )}
            </div>
          </div>
          <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
            {startButton(workingVideo.status)}
          </div>
        </div>
      </div>
    </div>
  );
}
