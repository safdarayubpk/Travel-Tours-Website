// Loading skeleton for tour cards

import { Card } from "@/components/ui/card";

export function TourSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image Skeleton */}
      <div className="h-64 w-full animate-pulse bg-gray-200" />

      {/* Content Skeleton */}
      <div className="p-6">
        <div className="mb-2 h-8 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="mb-4 h-4 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="mb-6 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-10 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </Card>
  );
}

