// Analytics utility functions for tracking events
// Use these functions in client components to track user actions

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Track a page view in Google Analytics
 * @param url - The URL of the page being viewed
 */
export function trackPageView(url: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "", {
      page_path: url,
    });
  }
}

/**
 * Track a custom event in Google Analytics
 * @param eventName - Name of the event (e.g., 'contact_form_submit')
 * @param eventParams - Additional parameters for the event
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
}

/**
 * Track a tour view event
 * @param tourName - Name of the tour being viewed
 * @param tourSlug - URL slug of the tour
 */
export function trackTourView(tourName: string, tourSlug: string) {
  trackEvent("view_tour", {
    tour_name: tourName,
    tour_slug: tourSlug,
  });
}

/**
 * Track a contact form submission
 * @param tourName - Optional tour name if form submitted from tour page
 */
export function trackContactFormSubmit(tourName?: string) {
  trackEvent("contact_form_submit", {
    tour_name: tourName || "general_inquiry",
  });
}

/**
 * Track a filter usage event
 * @param filterType - Type of filter used (region, price, duration)
 * @param filterValue - Value selected
 */
export function trackFilterUsage(filterType: string, filterValue: string) {
  trackEvent("filter_used", {
    filter_type: filterType,
    filter_value: filterValue,
  });
}
