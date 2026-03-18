"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useHotels } from "@/hooks/useHotels";
import { HotelCard } from "./HotelCard";
import type { SearchParams as SearchParamsType } from "@/types";
import type { SortOption } from "@/types";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "rating_desc", label: "Rating: high to low" },
];

const RATING_FILTER_OPTIONS: { value: "any" | "3" | "4" | "5"; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "3", label: "3 stars" },
  { value: "4", label: "4 stars" },
  { value: "5", label: "5 stars" },
];

type RatingFilterValue = "any" | "3" | "4" | "5";

function getSearchParamsFromURL(
  searchParams: ReturnType<typeof useSearchParams>
): SearchParamsType | null {
  const destination = searchParams.get("destination");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");
  if (!destination || !checkIn || !checkOut || !guests) return null;
  const guestsNum = parseInt(guests, 10);
  if (isNaN(guestsNum) || guestsNum < 1) return null;
  return { destination, checkIn, checkOut, guests: guestsNum };
}

function parseOptionalPositiveInt(value: string | null): number | null {
  if (!value) return null;
  const num = Number.parseInt(value, 10);
  if (Number.isNaN(num) || num < 0) return null;
  return num;
}

function parseOptionalMinRating(value: string | null): number | null {
  const num = parseOptionalPositiveInt(value);
  if (num === null) return null;
  if (num < 1 || num > 5) return null;
  return num;
}

export function HotelList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = getSearchParamsFromURL(searchParams);
  const sort = (searchParams.get("sort") as SortOption) || "price_asc";
  const hotels = useHotels(params?.destination ?? "", sort);

  if (!params) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-center">
        <p className="text-amber-800">Missing search criteria.</p>
        <a
          href="/"
          className="mt-2 inline-block text-sm font-medium text-amber-700 underline hover:no-underline"
        >
          Refine your search
        </a>
      </div>
    );
  }

  const urlMinPrice = searchParams.get("minPrice");
  const urlMaxPrice = searchParams.get("maxPrice");
  const urlMinRating = searchParams.get("minRating");

  const appliedMinPrice = parseOptionalPositiveInt(urlMinPrice);
  const appliedMaxPrice = parseOptionalPositiveInt(urlMaxPrice);
  const appliedMinRating = parseOptionalMinRating(urlMinRating);

  const [priceMinInput, setPriceMinInput] = useState<string>(
    urlMinPrice ?? ""
  );
  const [priceMaxInput, setPriceMaxInput] = useState<string>(
    urlMaxPrice ?? ""
  );
  const [minRatingInput, setMinRatingInput] = useState<
    RatingFilterValue
  >(
    urlMinRating === "3" || urlMinRating === "4" || urlMinRating === "5"
      ? urlMinRating
      : "any"
  );
  const [filterError, setFilterError] = useState<string | null>(null);

  // Keep the inputs in sync when the URL changes (e.g. back/forward).
  useEffect(() => {
    setPriceMinInput(urlMinPrice ?? "");
  }, [urlMinPrice]);

  useEffect(() => {
    setPriceMaxInput(urlMaxPrice ?? "");
  }, [urlMaxPrice]);

  useEffect(() => {
    setMinRatingInput(
      urlMinRating === "3" || urlMinRating === "4" || urlMinRating === "5"
        ? urlMinRating
        : "any"
    );
  }, [urlMinRating]);

  const buildResultsUrl = (next: URLSearchParams): string => {
    return `/results?${next.toString()}`;
  };

  const updateSort = (newSort: SortOption) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set("sort", newSort);
    router.push(buildResultsUrl(next));
  };

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      if (appliedMinPrice !== null && hotel.pricePerNight < appliedMinPrice)
        return false;
      if (appliedMaxPrice !== null && hotel.pricePerNight > appliedMaxPrice)
        return false;
      // Match rating exactly (3 -> only 3-star hotels, 4 -> only 4-star hotels, etc).
      if (appliedMinRating !== null && hotel.starRating !== appliedMinRating)
        return false;
      return true;
    });
  }, [hotels, appliedMinPrice, appliedMaxPrice, appliedMinRating]);

  const applyFilters = (options?: { rating?: RatingFilterValue }) => {
    setFilterError(null);

    const min = priceMinInput.trim() === "" ? null : Number.parseInt(priceMinInput, 10);
    const max = priceMaxInput.trim() === "" ? null : Number.parseInt(priceMaxInput, 10);
    const rating = options?.rating ?? minRatingInput;

    if (min !== null && (Number.isNaN(min) || min < 0)) {
      setFilterError("Enter a valid minimum price.");
      return;
    }
    if (max !== null && (Number.isNaN(max) || max < 0)) {
      setFilterError("Enter a valid maximum price.");
      return;
    }
    if (min !== null && max !== null && min > max) {
      setFilterError("Minimum price cannot be greater than maximum price.");
      return;
    }

    const next = new URLSearchParams(searchParams.toString());

    if (min === null) next.delete("minPrice");
    else next.set("minPrice", String(min));

    if (max === null) next.delete("maxPrice");
    else next.set("maxPrice", String(max));

    if (rating === "any") next.delete("minRating");
    else next.set("minRating", rating);

    router.push(buildResultsUrl(next));
  };

  const resetFilters = () => {
    setFilterError(null);
    setPriceMinInput("");
    setPriceMaxInput("");
    setMinRatingInput("any");

    const next = new URLSearchParams(searchParams.toString());
    next.delete("minPrice");
    next.delete("maxPrice");
    next.delete("minRating");
    router.push(buildResultsUrl(next));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-gray-600">
          <span className="font-medium text-gray-900">{filteredHotels.length}</span>{" "}
          hotel{filteredHotels.length !== 1 ? "s" : ""} in {params.destination}
        </p>
        <label className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Sort by</span>
          <select
            value={sort}
            onChange={(e) => {
              updateSort(e.target.value as SortOption);
            }}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-label="Sort results"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1">
            <p className="mb-3 text-sm font-semibold text-gray-900">Filters</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Price range (€)
                </label>
                <div className="flex gap-2">
                  <input
                    inputMode="numeric"
                    type="number"
                    min={0}
                    placeholder="Min"
                    value={priceMinInput}
                    onChange={(e) => setPriceMinInput(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    aria-label="Minimum price"
                  />
                  <input
                    inputMode="numeric"
                    type="number"
                    min={0}
                    placeholder="Max"
                    value={priceMaxInput}
                    onChange={(e) => setPriceMaxInput(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    aria-label="Maximum price"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <select
                  value={minRatingInput}
                  onChange={(e) => {
                    const nextValue = e.target.value as RatingFilterValue;
                    setMinRatingInput(nextValue);
                    applyFilters({ rating: nextValue });
                  }}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  aria-label="Minimum rating"
                >
                  {RATING_FILTER_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filterError && (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {filterError}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={applyFilters}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {filteredHotels.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-600">No hotels match your filters.</p>
          <a
            href="/"
            className="mt-2 inline-block font-medium text-blue-600 hover:text-blue-700"
          >
            Search again
          </a>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredHotels.map((hotel) => (
            <li key={hotel.id}>
              <HotelCard hotel={hotel} searchParams={params} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
