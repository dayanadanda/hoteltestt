"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { HotelList } from "@/components/HotelList";

function ResultsContent() {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");
  const hasParams = destination && checkIn && checkOut && guests;

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
      <HotelList />
    </div>
  );
}

function ResultsFallback() {
  return (
    <div className="py-8">
      <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
      <div className="mt-6 h-64 animate-pulse rounded-lg bg-gray-100" />
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<ResultsFallback />}>
      <ResultsContent />
    </Suspense>
  );
}
