// Tour filtering, sorting, and helper utilities

import { Tour } from "@/types/tour";
import { FilterState, SortOption } from "@/types/filters";

/**
 * Filter tours based on criteria
 */
export function filterTours(tours: Tour[], filters: FilterState): Tour[] {
  return tours.filter((tour) => {
    // Region filter
    if (filters.region && tour.region !== filters.region) {
      return false;
    }

    // Price range filter
    if (filters.minPrice !== undefined && tour.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && tour.price > filters.maxPrice) {
      return false;
    }

    // Duration filter
    if (filters.minDays !== undefined && tour.duration.days < filters.minDays) {
      return false;
    }
    if (filters.maxDays !== undefined && tour.duration.days > filters.maxDays) {
      return false;
    }

    return true;
  });
}

/**
 * Sort tours by specified option
 */
export function sortTours(tours: Tour[], sortBy: SortOption = "name"): Tour[] {
  const sorted = [...tours]; // Create copy to avoid mutation

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);

    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);

    case "duration-asc":
      return sorted.sort((a, b) => a.duration.days - b.duration.days);

    case "duration-desc":
      return sorted.sort((a, b) => b.duration.days - a.duration.days);

    case "name":
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
}

/**
 * Parse filters from URL search params
 */
export function parseFiltersFromSearchParams(
  searchParams: URLSearchParams
): FilterState {
  return {
    region: searchParams.get("region") || undefined,
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    minDays: searchParams.get("minDays")
      ? Number(searchParams.get("minDays"))
      : undefined,
    maxDays: searchParams.get("maxDays")
      ? Number(searchParams.get("maxDays"))
      : undefined,
    sort: (searchParams.get("sort") as SortOption) || "name",
  };
}
