// Tour details dynamic page

import { notFound } from "next/navigation";
import { getTours, getTourBySlug } from "@/data/tours";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { TourHero } from "@/components/tours/tour-hero";
import { TourHeader } from "@/components/tours/tour-header";
import { ImageGallery } from "@/components/tours/image-gallery";
import { TourDescription } from "@/components/tours/tour-description";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

interface TourDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all tours (SSG)
 */
export async function generateStaticParams() {
  const tours = getTours();
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

/**
 * Generate dynamic metadata for SEO
 */
export async function generateMetadata({
  params,
}: TourDetailPageProps): Promise<Metadata> {
  // Await params (Next.js 15 requirement)
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    return {
      title: "Tour Not Found - Travel & Tours",
      description: "The requested tour could not be found.",
    };
  }

  return {
    title: `${tour.name} - ${tour.country} Tour | $${tour.price.toLocaleString()} | Travel & Tours`,
    description: `${tour.description} | ${tour.duration.days} days, ${tour.duration.nights} nights. Starting from $${tour.price.toLocaleString()}. Book your ${tour.country} adventure today!`,
    keywords: [
      tour.name,
      `${tour.country} tour`,
      `${tour.region} travel`,
      `${tour.country} vacation`,
      "guided tour",
      "travel package",
      tour.country,
      tour.region,
    ],
    openGraph: {
      title: `${tour.name} - ${tour.country} Tour`,
      description: tour.description,
      images: tour.images.map((img) => ({
        url: img,
        alt: `${tour.name} - ${tour.country}`,
      })),
      type: "website",
      locale: "en_US",
      url: `https://traveltours.com/tours/${tour.slug}`,
      siteName: "Travel & Tours",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tour.name} - ${tour.country} Tour`,
      description: tour.description,
      ...(tour.images[0] && { images: [tour.images[0]] }),
      creator: "@traveltours",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  // Await params (Next.js 15 requirement)
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.description,
    itinerary: tour.extendedDescription,
    touristType: "International Travelers",
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: tour.currency,
    },
    tourBookingPage: `https://traveltours.com/tours/${tour.slug}`,
  };

  return (
    <div>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Tours", href: "/tours" },
            { label: tour.name, href: `/tours/${tour.slug}` },
          ]}
        />
      </div>

      {/* Tour Hero Image */}
      <TourHero tour={tour} />

      {/* Tour Details Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tour Header */}
            <TourHeader tour={tour} />

            {/* Image Gallery */}
            <div className="mt-8">
              <ImageGallery images={tour.images} tourName={tour.name} />
            </div>

            {/* Tour Description */}
            <div className="mt-8">
              <TourDescription tour={tour} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-lg border bg-white p-6 shadow-lg">
              <div className="mb-6">
                <p className="mb-2 text-sm text-gray-600">Starting from</p>
                <p className="text-4xl font-bold text-blue-600">
                  ${tour.price.toLocaleString()}
                </p>
                <p className="mt-1 text-sm text-gray-500">per person</p>
              </div>

              <div className="mb-6 space-y-3 border-t pt-6">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Duration</span>
                  <span className="font-medium">
                    {tour.duration.days} days, {tour.duration.nights} nights
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Region</span>
                  <span className="font-medium">{tour.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Country</span>
                  <span className="font-medium">{tour.country}</span>
                </div>
              </div>

              <Button asChild className="w-full" size="lg">
                <Link href={`/contact?tour=${tour.slug}`}>
                  Contact About This Tour
                </Link>
              </Button>

              <p className="mt-4 text-center text-xs text-gray-500">
                Get in touch to learn more or book this tour
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

