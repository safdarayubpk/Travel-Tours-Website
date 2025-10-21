// Home page for Travel & Tours website

import { getFeaturedTours } from "@/data/tours";
import { HeroSection } from "@/components/tours/hero-section";
import { TourGrid } from "@/components/tours/tour-grid";
import { TourCard } from "@/components/tours/tour-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel & Tours - Discover Amazing International Destinations",
  description:
    "Explore curated international travel tours to Europe, Asia, Americas, and Africa. Find your perfect adventure with expert guides and unforgettable experiences.",
  keywords: [
    "travel tours",
    "international travel",
    "vacation packages",
    "Europe tours",
    "Asia tours",
    "Africa tours",
    "Americas tours",
    "guided tours",
    "adventure travel",
    "luxury tours",
  ],
  authors: [{ name: "Travel & Tours" }],
  creator: "Travel & Tours",
  publisher: "Travel & Tours",
  openGraph: {
    title: "Travel & Tours - Discover Amazing Destinations",
    description:
      "Explore curated international travel tours to Europe, Asia, Americas, and Africa. Find your perfect adventure.",
    type: "website",
    locale: "en_US",
    url: "https://traveltours.com",
    siteName: "Travel & Tours",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel & Tours - Discover Amazing Destinations",
    description:
      "Explore curated international travel tours to Europe, Asia, Americas, and Africa.",
    creator: "@traveltours",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code-here", // Add your verification code
    // yandex: "yandex-verification-code",
    // bing: "bing-verification-code",
  },
};

export default function HomePage() {
  const featuredTours = getFeaturedTours();

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Tours Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Featured Tours
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Discover our hand-picked selection of the most popular destinations
            around the world
          </p>
        </div>

        <TourGrid>
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </TourGrid>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/tours">View All Tours</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
