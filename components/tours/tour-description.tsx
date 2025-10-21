// Tour description section with highlights

import { Check } from "lucide-react";
import type { Tour } from "@/types/tour";

interface TourDescriptionProps {
  tour: Tour;
}

export function TourDescription({ tour }: TourDescriptionProps) {
  return (
    <div className="space-y-8">
      {/* Overview */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Overview</h2>
        <p className="leading-relaxed text-gray-700">{tour.description}</p>
      </div>

      {/* Detailed Itinerary */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Detailed Itinerary
        </h2>
        <p className="whitespace-pre-line leading-relaxed text-gray-700">
          {tour.extendedDescription}
        </p>
      </div>

      {/* Tour Highlights */}
      <div>
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          What&apos;s Included
        </h2>
        <ul className="space-y-3">
          {tour.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-gray-700">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

