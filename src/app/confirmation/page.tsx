"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getConfirmationFromSession } from "@/components/BookingForm";
import type { BookingSummary as BookingSummaryType } from "@/types";

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} stars`}>
      {Array.from({ length: full }, (_, i) => (
        <span key={i} className="text-amber-400" aria-hidden>★</span>
      ))}
      {hasHalf && <span className="text-amber-400" aria-hidden>★</span>}
    </span>
  );
}

export default function ConfirmationPage() {
  const [booking, setBooking] = useState<BookingSummaryType | null | undefined>(undefined);

  useEffect(() => {
    setBooking(getConfirmationFromSession());
  }, []);

  if (booking === undefined) {
    return (
      <div className="py-8">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="mt-6 h-64 animate-pulse rounded-lg bg-gray-100" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-900">No booking found</h1>
        <p className="mt-2 text-gray-600">
          Your confirmation may have expired or you arrived here by mistake.
        </p>
        <Link href="/" className="mt-4 inline-block font-medium text-blue-600 hover:text-blue-700">
          Search hotels
        </Link>
      </div>
    );
  }

  const { hotel, searchParams, guestName, guestEmail, confirmationId } = booking;

  return (
    <div className="py-8">
      <div className="mx-auto max-w-2xl rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Thank you!</h1>
        <p className="mt-2 text-gray-700">Your reservation has been confirmed.</p>
        <p className="mt-4 font-mono text-lg font-semibold text-gray-900">
          Confirmation #{confirmationId}
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Booking details</h2>
        <div className="flex gap-4">
          <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-md bg-gray-200">
            <Image
              src={hotel.imageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
          <div className="min-w-0 flex-1 text-left">
            <h3 className="font-semibold text-gray-900">{hotel.name}</h3>
            <p className="text-sm text-gray-500">{hotel.destination}</p>
            <div className="mt-1 flex items-center gap-2">
              <StarRating rating={hotel.starRating} />
              <span className="text-sm text-gray-600">{hotel.starRating}</span>
            </div>
          </div>
        </div>
        <dl className="mt-4 grid gap-2 border-t border-gray-100 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-500">Check-in</dt>
            <dd className="font-medium text-gray-900">{searchParams.checkIn}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Check-out</dt>
            <dd className="font-medium text-gray-900">{searchParams.checkOut}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Guests</dt>
            <dd className="font-medium text-gray-900">{searchParams.guests}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Guest name</dt>
            <dd className="font-medium text-gray-900">{guestName}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Email</dt>
            <dd className="font-medium text-gray-900">{guestEmail}</dd>
          </div>
        </dl>
        <p className="mt-4 text-lg font-semibold text-gray-900">
          €{hotel.pricePerNight}{" "}
          <span className="text-sm font-normal text-gray-500">/ night</span>
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-block rounded-md bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search again
        </Link>
      </div>
    </div>
  );
}
