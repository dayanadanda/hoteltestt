"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import Link from "next/link";
import { getHotelById } from "@/data/hotels";
import { BookingSummary } from "@/components/BookingSummary";
import { BookingForm } from "@/components/BookingForm";
import type { SearchParams } from "@/types";

function getSearchParamsFromURL(
  searchParams: ReturnType<typeof useSearchParams>
): SearchParams | null {
  const destination = searchParams.get("destination");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");
  if (!destination || !checkIn || !checkOut || !guests) return null;
  const guestsNum = parseInt(guests, 10);
  if (isNaN(guestsNum) || guestsNum < 1) return null;
  return { destination, checkIn, checkOut, guests: guestsNum };
}

function HotelBookingFallback() {
  return (
    <div className="py-8">
      <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
      <div className="mt-6 h-64 animate-pulse rounded-lg bg-gray-100" />
    </div>
  );
}

function HotelBookingContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = typeof params?.id === "string" ? params.id : "";

  const hotel = useMemo(() => getHotelById(id), [id]);
  const search = getSearchParamsFromURL(searchParams);

  if (!hotel) {
    return (
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-900">Hotel not found</h1>
        <p className="mt-2 text-gray-600">This hotel does not exist or has been removed.</p>
        <Link href="/" className="mt-4 inline-block font-medium text-blue-600 hover:text-blue-700">
          Back to search
        </Link>
      </div>
    );
  }

  if (!search) {
    return (
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-900">Missing search details</h1>
        <p className="mt-2 text-gray-600">Please start from the search page with dates and guests.</p>
        <Link href="/" className="mt-4 inline-block font-medium text-blue-600 hover:text-blue-700">
          Search hotels
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Complete your reservation</h1>
        <Link
          href={`/results?${searchParams.toString()}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Back to results
        </Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BookingSummary hotel={hotel} searchParams={search} />
        </div>
        <div>
          <BookingForm hotel={hotel} searchParams={search} />
        </div>
      </div>
    </div>
  );
}

export default function HotelBookingPage() {
  return (
    <Suspense fallback={<HotelBookingFallback />}>
      <HotelBookingContent />
    </Suspense>
  );
}
