import { startVideoProcessing, stopVideoProcessing } from "../utils/videoAPI";
import { useVideoContext } from "../contexts/videos";

interface VideoActionButtonProps {
  video: any;
}

export default function VideoActionButton({ video }: VideoActionButtonProps) {
  const { isVideoProcessing, setIsVideoProcessing } = useVideoContext();

  const handleView = () => {
    // remove special characters from title
    let postTitle = video.title.replace(/[^a-zA-Z0-9 ]/g, "");
    // replace spaces with dashes
    postTitle = postTitle.replace(/ /g, "-");

    window.open(`/files/${video.postId}/${postTitle}.mp4`, "_blank");
  };

  const handleStart = async () => {
    console.log("starting: " + video._id);

    const data = await startVideoProcessing(video._id);

    if (data && !data.workerId) {
      setIsVideoProcessing(false);
    }
  };

  const handleStop = async () => {
    console.log("stopping: " + video._id);

    const data = await stopVideoProcessing();

    console.log(data);
    if (data && !data.error) {
      setIsVideoProcessing(true);
    } else {
      console.log(data.error);
    }
  };

  if (video.status === "complete") {
    return (
      <button
        onClick={handleView}
        className="text-blue-600 hover:text-blue-900"
      >
        View
      </button>
    );
  }

  if (video.status === "processing") {
    return (
      <button onClick={handleStop} className="text-red-600 hover:text-red-900">
        Stop
      </button>
    );
  }

  return (
    <button
      onClick={handleStart}
      className={`${
        isVideoProcessing && video.status === "new"
          ? "text-gray-300 cursor-not-allowed"
          : "text-blue-600 hover:text-blue-900"
      }`}
    >
      Start
    </button>
  );
}
