import { startVideoProcessing, stopVideoProcessing } from "../utils/videoAPI";
import { useVideoContext } from "../contexts/videos";

interface VideoActionButtonProps {
  video: any;
  className?: string;
}

export default function VideoActionButton({
  video,
  className = "",
}: VideoActionButtonProps) {
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

  const handleClick = async () => {
    if (video.status === "processing") await handleStop();
    else if (video.status === "complete") handleView();
    else if (video.status === "new") await handleStart();
  };

  const buttonStates = {
    new: {
      text: "Start",
      color: "text-blue-600 hover:text-blue-900",
    },
    processing: {
      text: "Stop",
      color: "text-red-600 hover:text-red-900",
    },
    complete: {
      text: "View",
      color: "text-blue-600 hover:text-blue-900",
    },
  };

  return (
    <button
      onClick={handleClick}
      className={
        `${buttonStates[video.status as keyof typeof buttonStates].color}` +
        className
      }
      disabled={isVideoProcessing && video.status === "new"}
    >
      {buttonStates[video.status as keyof typeof buttonStates].text}
    </button>
  );
}
