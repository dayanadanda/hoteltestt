"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getBookingHistory } from "@/lib/bookingHistory";
import type { BookingSummary } from "@/types";

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

function BookingCard({ booking }: { booking: BookingSummary }) {
  const { hotel, searchParams, guestName, guestEmail, confirmationId } = booking;
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
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
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-gray-900">{hotel.name}</h2>
          <p className="text-sm text-gray-500">{hotel.destination}</p>
          <div className="mt-1 flex items-center gap-2">
            <StarRating rating={hotel.starRating} />
            <span className="text-sm text-gray-600">{hotel.starRating}</span>
          </div>
          <dl className="mt-2 space-y-0.5 text-sm text-gray-600">
            <div className="flex gap-2">
              <dt className="font-medium">Check-in:</dt>
              <dd>{searchParams.checkIn}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium">Check-out:</dt>
              <dd>{searchParams.checkOut}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium">Guests:</dt>
              <dd>{searchParams.guests}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-medium">Booked by:</dt>
              <dd>{guestName} ({guestEmail})</dd>
            </div>
          </dl>
          <p className="mt-2 font-mono text-xs text-gray-500">
            Confirmation #{confirmationId}
          </p>
          <p className="mt-1 text-sm font-semibold text-gray-900">
            €{hotel.pricePerNight}{" "}
            <span className="font-normal text-gray-500">/ night</span>
          </p>
        </div>
      </div>
    </article>
  );
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingSummary[] | null>(null);

  useEffect(() => {
    setBookings(getBookingHistory());
  }, []);

  if (bookings === null) {
    return (
      <div className="py-8">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="mt-6 h-48 animate-pulse rounded-lg bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-gray-900">My bookings</h1>
      <p className="mt-2 text-gray-600">
        Your past reservations (stored in this browser).
      </p>

      {bookings.length === 0 ? (
        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-600">You don’t have any bookings yet.</p>
          <Link
            href="/"
            className="mt-4 inline-block font-medium text-blue-600 hover:text-blue-700"
          >
            Search hotels
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {bookings.map((booking) => (
            <li key={booking.confirmationId}>
              <BookingCard booking={booking} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
