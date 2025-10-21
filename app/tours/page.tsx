// Tours listing page with filtering and sorting

import { getTours } from "@/data/tours";
import {
  filterTours,
  sortTours,
  parseFiltersFromSearchParams,
} from "@/lib/tour-helpers";
import { TourGrid } from "@/components/tours/tour-grid";
import { TourCard } from "@/components/tours/tour-card";
import { TourFilters } from "@/components/tours/tour-filters";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Tours - Browse International Travel Packages | Travel & Tours",
  description:
    "Browse all our international travel tours. Filter by region, price, and duration to find your perfect adventure. 15 destinations across Europe, Asia, Americas, and Africa.",
  keywords: [
    "all tours",
    "travel packages",
    "international tours",
    "vacation deals",
    "tour packages",
    "group tours",
    "guided tours",
    "adventure tours",
  ],
  openGraph: {
    title: "All Tours - Browse International Travel Packages",
    description:
      "Browse 15 international travel tours across Europe, Asia, Americas, and Africa. Find your perfect adventure.",
    type: "website",
    locale: "en_US",
    url: "https://traveltours.com/tours",
    siteName: "Travel & Tours",
  },
  twitter: {
    card: "summary",
    title: "All Tours - Browse International Travel Packages",
    description:
      "Browse 15 international travel tours. Filter by region, price, and duration.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface ToursPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ToursPage({ searchParams }: ToursPageProps) {
  const allTours = getTours();

  // Await searchParams (Next.js 15 requirement)
  const params = await searchParams;

  // Parse URL search params into filters
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string") {
      urlParams.set(key, value);
    }
  });

  const filters = parseFiltersFromSearchParams(urlParams);

  // Apply filters and sorting
  let filteredTours = filterTours(allTours, filters);
  filteredTours = sortTours(filteredTours, filters.sort || "name");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">All Tours</h1>
        <p className="text-lg text-gray-600">
          Showing {filteredTours.length} of {allTours.length} tours
        </p>
      </div>

      {/* Filters + Tours Grid Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <div className="rounded-lg border bg-white p-6">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
              Filter Tours
            </h2>
            <TourFilters />
          </div>
        </aside>

        {/* Tours Grid */}
        <div className="lg:col-span-3">
          {filteredTours.length === 0 ? (
            <div className="rounded-lg border border-dashed bg-gray-50 p-12 text-center">
              <p className="text-lg text-gray-600">
                No tours match your filters.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Try adjusting your search criteria.
              </p>
            </div>
          ) : (
            <TourGrid>
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </TourGrid>
          )}
        </div>
      </div>
    </div>
  );
}

