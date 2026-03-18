"use client";

import { useSearchParams } from "next/navigation";
import { useHotels } from "@/hooks/useHotels";
import { HotelCard } from "./HotelCard";
import type { SearchParams as SearchParamsType } from "@/types";
import type { SortOption } from "@/types";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "rating_desc", label: "Rating: high to low" },
];

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

export function HotelList() {
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

  const updateSort = (newSort: SortOption) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set("sort", newSort);
    return `?${next.toString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-gray-600">
          <span className="font-medium text-gray-900">{hotels.length}</span>{" "}
          hotel{hotels.length !== 1 ? "s" : ""} in {params.destination}
        </p>
        <label className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Sort by</span>
          <select
            value={sort}
            onChange={(e) => {
              window.location.href = updateSort(e.target.value as SortOption);
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

      {hotels.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-600">No hotels found for this search.</p>
          <a
            href="/"
            className="mt-2 inline-block font-medium text-blue-600 hover:text-blue-700"
          >
            Search again
          </a>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <li key={hotel.id}>
              <HotelCard hotel={hotel} searchParams={params} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
