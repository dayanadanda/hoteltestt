"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { HotelList } from "@/components/HotelList";

function ResultsListFallback() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-full animate-pulse rounded bg-gray-100" />
      <div className="h-10 w-full animate-pulse rounded bg-gray-100" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <div
            key={idx}
            className="h-[24rem] animate-pulse overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <div className="h-48 w-full bg-gray-100" />
            <div className="p-4">
              <div className="mb-2 h-5 w-3/4 rounded bg-gray-100" />
              <div className="mb-4 h-4 w-1/2 rounded bg-gray-100" />
              <div className="mt-auto h-7 w-2/3 rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");
  const sort = searchParams.get("sort");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const minRating = searchParams.get("minRating");
  const hasParams = Boolean(destination && checkIn && checkOut && guests);

  const hasValidQuery = useMemo(() => {
    if (!destination || !checkIn || !checkOut || !guests) return false;
    const guestsNum = Number.parseInt(guests, 10);
    return Number.isFinite(guestsNum) && guestsNum >= 1;
  }, [destination, checkIn, checkOut, guests]);

  const [isLoading, setIsLoading] = useState(false);

  // HotelList derives from local mock data; there’s no real network latency,
  // so we show a short skeleton when the query changes to make the flow feel responsive.
  useEffect(() => {
    if (!hasValidQuery) return;
    setIsLoading(true);
    const t = window.setTimeout(() => setIsLoading(false), 350);
    return () => window.clearTimeout(t);
  }, [hasValidQuery, destination, checkIn, checkOut, guests, sort, minPrice, maxPrice, minRating]);

  return (
    <div className="py-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Search results</h1>
        {hasParams && (
          <Link
            href="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Change search
          </Link>
        )}
      </div>
      {isLoading ? <ResultsListFallback /> : <HotelList />}
    </div>
  );
}

export default function ResultsPage() {
  return <ResultsContent />;
}
