"use client";

// Error boundary for tour detail page

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Tour detail page error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          Something went wrong!
        </h2>
        <p className="mb-8 text-gray-600">
          We encountered an error loading this tour. Please try again.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="outline" asChild>
            <Link href="/tours">View All Tours</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

