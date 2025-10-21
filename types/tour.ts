// Tour entity types for Travel & Tours website

export type Region = "Europe" | "Asia" | "Americas" | "Africa";

export interface TourDuration {
  days: number;
  nights: number;
}

export interface Tour {
  // Identity
  id: string;
  slug: string;

  // Basic Information
  name: string;
  country: string;
  region: Region;

  // Pricing
  price: number;
  currency: string;

  // Duration
  duration: TourDuration;

  // Descriptions
  description: string;
  extendedDescription: string;

  // Media
  images: string[];

  // Metadata
  featured: boolean;
  highlights: string[];

  // Optional future fields
  category?: string;
  rating?: number;
  reviewCount?: number;
}

