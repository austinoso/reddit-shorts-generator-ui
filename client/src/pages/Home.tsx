import AddVideo from "../components/AddVideo";
import WorkingVideo from "../components/WorkingVideo";
import VideoTable from "../components/VideoTable";

export default function Home() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 flex flex-col space-y-6">
      <AddVideo />
      <WorkingVideo />
      <VideoTable />
    </div>
  );
}
