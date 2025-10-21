// Contact page for Travel & Tours website

import { Suspense } from "react";
import { ContactForm } from "@/components/contact/contact-form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Get Expert Travel Advice | Travel & Tours",
  description:
    "Get in touch with our travel experts. We're here to help plan your perfect adventure. Email us at safdarayub@gmail.com or call +92 332 9611639. Response within 24 hours.",
  keywords: [
    "contact travel agency",
    "travel inquiry",
    "book tour",
    "travel consultation",
    "tour booking",
    "travel support",
  ],
  openGraph: {
    title: "Contact Us - Get Expert Travel Advice",
    description:
      "Get in touch with our travel experts. We're here to help plan your perfect adventure. Response within 24 hours.",
    type: "website",
    locale: "en_US",
    url: "https://traveltours.com/contact",
    siteName: "Travel & Tours",
  },
  twitter: {
    card: "summary",
    title: "Contact Us - Travel & Tours",
    description: "Get expert travel advice. Response within 24 hours.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Have questions about our tours? Want to book an adventure? Fill out
          the form below and our travel experts will get back to you within 24
          hours.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <div>
          <div className="rounded-lg border bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Send us a message
            </h2>
            <Suspense fallback={<div className="h-96 animate-pulse rounded bg-gray-100" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <div className="rounded-lg border bg-gray-50 p-8">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Contact Information
            </h2>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600">
                    Tehsil Seni Gumbat
                    <br />
                    District Kohat, KP
                    <br />
                    Pakistan
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">Email</h3>
                  <a
                    href="mailto:safdarayub@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    safdarayub@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">Phone</h3>
                  <a
                    href="tel:+923329611639"
                    className="text-blue-600 hover:underline"
                  >
                    +923329611639
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-gray-900">
                    Business Hours
                  </h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 rounded-lg bg-blue-50 p-6">
              <h3 className="mb-2 font-semibold text-blue-900">
                Why choose us?
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>✓ Expert travel consultants</li>
                <li>✓ 24/7 customer support</li>
                <li>✓ Best price guarantee</li>
                <li>✓ Flexible booking options</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

