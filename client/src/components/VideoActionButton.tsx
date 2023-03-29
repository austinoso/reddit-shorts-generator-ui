interface VideoActionButtonProps {
  video: any;
  disableStartButton: boolean;
  setDisableStartButton: (disableStartButton: boolean) => void;
}

export default function VideoActionButton({
  video,
  disableStartButton,
  setDisableStartButton,
}: VideoActionButtonProps) {
  const handleView = () => {
    console.log("view");
  };

  const handleStart = async () => {
    if (disableStartButton) return;
    setDisableStartButton(true);
    console.log("starting: " + video._id);

    const res = await fetch(`/api/videos/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoId: video._id }),
    });

    const data = await res.json();

    if (!data.workerId) {
      setDisableStartButton(false);
    }
  };

  const handleStop = () => {
    console.log("stopping: " + video._id);
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
        disableStartButton && video.status === "new"
          ? "text-gray-300 cursor-not-allowed"
          : "text-blue-600 hover:text-blue-900"
      }`}
    >
      Start
    </button>
  );
}
