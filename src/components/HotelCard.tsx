import Image from "next/image";
import Link from "next/link";
import type { Hotel } from "@/types";
import type { SearchParams } from "@/types";

interface HotelCardProps {
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

export function HotelCard({ hotel, searchParams }: HotelCardProps) {
  const query = new URLSearchParams({
    destination: searchParams.destination,
    checkIn: searchParams.checkIn,
    checkOut: searchParams.checkOut,
    guests: String(searchParams.guests),
  });
  const href = `/hotel/${hotel.id}?${query.toString()}`;

  return (
    <Link
      href={href}
      className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={`View ${hotel.name}, ${hotel.starRating} stars, €${hotel.pricePerNight} per night`}
    >
      <div className="relative h-48 w-full bg-gray-200">
        <Image
          src={hotel.imageUrl}
          alt=""
          fill
          className="object-cover"
sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h2 className="font-semibold text-gray-900">{hotel.name}</h2>
        <p className="mt-1 text-sm text-gray-500">{hotel.destination}</p>
        <div className="mt-2 flex items-center gap-2">
          <StarRating rating={hotel.starRating} />
          <span className="text-sm text-gray-600">{hotel.starRating}</span>
        </div>
        <p className="mt-auto pt-3 text-lg font-semibold text-gray-900">
          €{hotel.pricePerNight}{" "}
          <span className="text-sm font-normal text-gray-500">/ night</span>
        </p>
      </div>
    </Link>
  );
}
