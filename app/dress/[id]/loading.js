export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Skeleton */}
        <div className="relative h-[600px] bg-gray-200 animate-pulse rounded-lg" />

        {/* Content Skeleton */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="h-10 bg-gray-200 animate-pulse rounded w-3/4 mb-2" />
              <div className="h-8 bg-gray-200 animate-pulse rounded w-1/3" />
            </div>
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-full" />
              <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-full" />
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
          </div>

          <div className="border-t border-b border-gray-200 py-6 mb-8">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/4 mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
              <div className="h-4 bg-gray-200 animate-pulse rounded w-1/3" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-14 bg-gray-200 animate-pulse rounded-full" />
            <div className="h-14 bg-gray-200 animate-pulse rounded-full" />
          </div>

          <div className="mt-8 bg-gray-100 p-6 rounded-lg">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/3 mb-3" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
              <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
              <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
