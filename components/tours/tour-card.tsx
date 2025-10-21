// Reusable tour card component

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar } from "lucide-react";
import type { Tour } from "@/types/tour";

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  const primaryImage = tour.images[0] ?? "/placeholder-tour.jpg";

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      {/* Tour Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={primaryImage}
          alt={`${tour.name} - ${tour.country}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute right-4 top-4">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
            {tour.region}
          </Badge>
        </div>
      </div>

      {/* Tour Information */}
      <div className="p-6">
        <h3 className="mb-2 text-2xl font-bold text-gray-900">{tour.name}</h3>

        <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{tour.country}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
              {tour.duration.days} days, {tour.duration.nights} nights
            </span>
          </div>
        </div>

        <p className="mb-6 line-clamp-3 text-gray-600">{tour.description}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">From</p>
            <p className="text-3xl font-bold text-blue-600">
              ${tour.price.toLocaleString()}
            </p>
          </div>

          <Button asChild>
            <Link href={`/tours/${tour.slug}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

