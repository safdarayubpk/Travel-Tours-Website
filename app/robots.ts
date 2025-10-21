// Robots.txt configuration for Travel & Tours website
// Tells search engines which pages to crawl

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://traveltours.com"; // Update with your actual domain

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // Don't crawl API routes
          "/_next/", // Don't crawl Next.js internals
          "/lighthouse-reports/", // Don't crawl test reports
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
