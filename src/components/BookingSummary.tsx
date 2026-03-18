import Image from "next/image";
import type { Hotel } from "@/types";
import type { SearchParams } from "@/types";

interface BookingSummaryProps {
  hotel: Hotel;
  searchParams: SearchParams;
}

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

export function BookingSummary({ hotel, searchParams }: BookingSummaryProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">Booking summary</h2>
      <div className="flex gap-4">
        <div className="relative h-32 w-40 shrink-0 overflow-hidden rounded-md bg-gray-200">
          <Image
            src={hotel.imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900">{hotel.name}</h3>
          <p className="text-sm text-gray-500">{hotel.destination}</p>
          <div className="mt-1 flex items-center gap-2">
            <StarRating rating={hotel.starRating} />
            <span className="text-sm text-gray-600">{hotel.starRating}</span>
          </div>
          <p className="mt-2 text-lg font-semibold text-gray-900">
            €{hotel.pricePerNight}{" "}
            <span className="text-sm font-normal text-gray-500">/ night</span>
          </p>
          <dl className="mt-3 space-y-1 text-sm text-gray-600">
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
          </dl>
        </div>
      </div>
    </div>
  );
}
