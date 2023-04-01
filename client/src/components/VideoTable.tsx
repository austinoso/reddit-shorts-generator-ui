import { useState, useEffect } from "react";
import AddVideo from "./AddVideo";
import { useVideoContext } from "../contexts/videos";
import VideoActionButon from "./VideoActionButton";

export default function VideoTable() {
  const { videos, setVideos, workingVideo, workingProgress } =
    useVideoContext();

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.data.videos);
      });
  }, []);

  const statusBadgeClasses: any = {
    added: "bg-grey-400 text-gray-800",
    complete: "bg-green-100 text-green-800",
    processing: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };

  const getBadgeClass = (status: string) => {
    return statusBadgeClasses[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flow-root">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Post Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {videos.map((video) => (
                  <tr key={video._id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {video.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {video.title || "..."}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getBadgeClass(
                          video.status
                        )}`}
                      >
                        {video.status || "Added"}
                        {video.status === "processing" && (
                          <span className="ml-1">
                            {workingVideo?._id === video._id
                              ? `${workingProgress} %`
                              : ""}
                            <span className="sr-only">Complete</span>
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex justify-end space-x-3">
                      <VideoActionButon video={video} />
                      <a href="#" className="text-gray-600 hover:text-blue-900">
                        Edit<span className="sr-only">, {video.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
