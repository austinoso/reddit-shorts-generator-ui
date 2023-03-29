import { useVideoContext } from "../contexts/videos";

export default function AddVideo() {
  const { videos, setVideos } = useVideoContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const videoData = {
      name: data.get("name"),
      url: data.get("url"),
    };

    console.log(videoData);

    const res = await fetch("/api/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(videoData),
    });

    const json = await res.json();

    console.log(json);

    setVideos([...videos, json.data.video]);
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Add Video
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Create a video with a friendly name and post link</p>
        </div>
        <form
          className="mt-5 sm:flex sm:items-end space-x-2"
          onSubmit={handleSubmit}
        >
          <div className="w-full sm:max-w-xs">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Project Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="fried chicken"
              />
            </div>
          </div>
          <div className="w-full sm:max-w-xs">
            <label
              htmlFor="url"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Post Link
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="url"
                id="url"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="https://www.reddit.com/r/AskReddit"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:mt-0 sm:ml-3 sm:w-auto"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
