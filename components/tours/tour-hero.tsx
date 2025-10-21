// Tour hero image section

import Image from "next/image";
import type { Tour } from "@/types/tour";

interface TourHeroProps {
  tour: Tour;
}

export function TourHero({ tour }: TourHeroProps) {
  const primaryImage = tour.images[0] ?? "/placeholder-tour.jpg";

  return (
    <div className="relative h-[400px] w-full overflow-hidden md:h-[500px] lg:h-[600px]">
      <Image
        src={primaryImage}
        alt={`${tour.name} - ${tour.country}`}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
    </div>
  );
}

