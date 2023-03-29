interface VideoActionButtonProps {
  status: string;
  disableStartButton: boolean;
}

export default function VideoActionButton({
  status,
  disableStartButton,
}: VideoActionButtonProps) {
  if (status === "complete") {
    return <button className="text-blue-600 hover:text-blue-900">View</button>;
  }

  return (
    <button
      className={`${
        disableStartButton && status === "new"
          ? "text-gray-300 cursor-not-allowed"
          : "text-blue-600 hover:text-blue-900"
      }`}
    >
      {status === "new" ? "Start" : "Stop"}
    </button>
  );
}
