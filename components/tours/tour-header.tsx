// Tour header with title, country, and metadata

import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, DollarSign } from "lucide-react";
import type { Tour } from "@/types/tour";

interface TourHeaderProps {
  tour: Tour;
}

export function TourHeader({ tour }: TourHeaderProps) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Badge variant="secondary" className="text-sm">
          {tour.region}
        </Badge>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{tour.country}</span>
        </div>
      </div>

      <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
        {tour.name}
      </h1>

      <div className="flex flex-wrap items-center gap-6 text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <span className="font-medium">
            {tour.duration.days} days, {tour.duration.nights} nights
          </span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          <span className="font-medium">
            From ${tour.price.toLocaleString()} {tour.currency}
          </span>
        </div>
      </div>
    </div>
  );
}

