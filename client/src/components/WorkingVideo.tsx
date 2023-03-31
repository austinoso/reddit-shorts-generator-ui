export default function WorkingVideo() {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Video In Progress
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae voluptatibus corrupti atque repudiandae nam.
              </p>
            </div>
          </div>
          <div className="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
