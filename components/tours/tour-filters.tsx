"use client";

// Tour filters component with URL-based state management

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SORT_OPTIONS } from "@/types/filters";

const REGIONS = [
  { value: "all", label: "All Regions" },
  { value: "Europe", label: "Europe" },
  { value: "Asia", label: "Asia" },
  { value: "Americas", label: "Americas" },
  { value: "Africa", label: "Africa" },
];

export function TourFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current filter values
  const region = searchParams.get("region") || "all";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const minDays = searchParams.get("minDays") || "";
  const maxDays = searchParams.get("maxDays") || "";
  const sort = searchParams.get("sort") || "name";

  /**
   * Update a single filter parameter
   */
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    // For region, "all" means no filter
    if (key === "region" && value === "all") {
      params.delete(key);
    } else if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/tours?${params.toString()}`);
  };

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    router.push("/tours");
  };

  /**
   * Check if any filters are active
   */
  const hasActiveFilters =
    (region && region !== "all") || minPrice || maxPrice || minDays || maxDays || sort !== "name";

  return (
    <div className="space-y-6">
      {/* Region Filter */}
      <div className="space-y-2">
        <Label htmlFor="region-filter">Region</Label>
        <Select value={region} onValueChange={(value) => updateFilter("region", value)}>
          <SelectTrigger id="region-filter">
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent>
            {REGIONS.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2">
        <Label>Price Range (USD)</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => updateFilter("minPrice", e.target.value)}
              min="0"
              step="100"
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => updateFilter("maxPrice", e.target.value)}
              min="0"
              step="100"
            />
          </div>
        </div>
      </div>

      {/* Duration Filter */}
      <div className="space-y-2">
        <Label>Duration (Days)</Label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Input
              type="number"
              placeholder="Min"
              value={minDays}
              onChange={(e) => updateFilter("minDays", e.target.value)}
              min="1"
              max="30"
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Max"
              value={maxDays}
              onChange={(e) => updateFilter("maxDays", e.target.value)}
              min="1"
              max="30"
            />
          </div>
        </div>
      </div>

      {/* Sort Filter */}
      <div className="space-y-2">
        <Label htmlFor="sort-filter">Sort By</Label>
        <Select value={sort} onValueChange={(value) => updateFilter("sort", value)}>
          <SelectTrigger id="sort-filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );
}

