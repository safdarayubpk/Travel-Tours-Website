// Filter and sort types for tours listing

export interface FilterState {
  region?: string;
  minPrice?: number;
  maxPrice?: number;
  minDays?: number;
  maxDays?: number;
  sort?: SortOption;
}

export type SortOption =
  | "name"
  | "price-asc"
  | "price-desc"
  | "duration-asc"
  | "duration-desc";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "name", label: "Name (A-Z)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
  { value: "duration-asc", label: "Duration (Shortest First)" },
  { value: "duration-desc", label: "Duration (Longest First)" },
];

