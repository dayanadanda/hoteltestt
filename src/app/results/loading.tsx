export default function ResultsLoading() {
  return (
    <div className="py-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />
        <div className="h-6 w-28 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="space-y-6">
        <div className="h-10 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-10 w-full animate-pulse rounded bg-gray-100" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              className="h-[24rem] animate-pulse overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="h-48 w-full bg-gray-100" />
              <div className="p-4">
                <div className="mb-2 h-5 w-3/4 rounded bg-gray-100" />
                <div className="mb-4 h-4 w-1/2 rounded bg-gray-100" />
                <div className="mt-auto h-7 w-2/3 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

