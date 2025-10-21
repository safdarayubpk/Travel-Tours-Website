// Loading state for tour detail page

export default function Loading() {
  return (
    <div>
      {/* Breadcrumb Skeleton */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      {/* Hero Skeleton */}
      <div className="h-[400px] w-full animate-pulse bg-gray-200 md:h-[500px] lg:h-[600px]" />

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-12 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="h-64 w-full animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

