// Loading state for tours page

import { TourSkeleton } from "@/components/tours/tour-skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="mb-2 h-10 w-48 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-6 w-32 animate-pulse rounded-lg bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Filters Skeleton */}
        <aside className="lg:col-span-1">
          <div className="rounded-lg border bg-white p-6">
            <div className="mb-6 h-6 w-24 animate-pulse rounded bg-gray-200" />
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                  <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Tours Grid Skeleton */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <TourSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

