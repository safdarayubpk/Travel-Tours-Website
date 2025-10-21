// Hero section for home page

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=600&fit=crop"
          alt="Beautiful travel destination"
          fill
          priority
          className="object-cover brightness-75"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Discover Your Next Adventure
            </h1>
            <p className="mb-8 text-xl text-white md:text-2xl">
              Explore international tours to amazing destinations around the
              world. From Europe to Asia, Americas to Africa.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="text-lg">
                <Link href="/tours">Explore Tours</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white bg-white/10 text-lg text-white backdrop-blur-sm hover:bg-white/20"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />
    </section>
  );
}

