"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getUniqueDestinations } from "@/data/hotels";
import { validateSearchForm, getTodayDateString, type SearchFormErrors } from "@/lib/validation";

const destinations = getUniqueDestinations();

export function SearchForm() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [errors, setErrors] = useState<SearchFormErrors>({});

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const formErrors = validateSearchForm(
        destination,
        checkIn,
        checkOut,
        guests
      );
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }
      setErrors({});
      const params = new URLSearchParams({
        destination: destination.trim(),
        checkIn,
        checkOut,
        guests: String(guests),
      });
      router.push(`/results?${params.toString()}`);
    },
    [destination, checkIn, checkOut, guests, router]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      noValidate
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Find your stay
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="destination" className="mb-1 block text-sm font-medium text-gray-700">
            Destination
          </label>
          <select
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-invalid={Boolean(errors.destination)}
            aria-describedby={errors.destination ? "destination-error" : undefined}
          >
            <option value="">Select a city</option>
            {destinations.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.destination && (
            <p id="destination-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.destination}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="checkIn" className="mb-1 block text-sm font-medium text-gray-700">
              Check-in
            </label>
            <input
              id="checkIn"
              type="date"
              value={checkIn}
              min={getTodayDateString()}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              aria-invalid={Boolean(errors.checkIn)}
              aria-describedby={errors.checkIn ? "checkIn-error" : undefined}
            />
            {errors.checkIn && (
              <p id="checkIn-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.checkIn}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="checkOut" className="mb-1 block text-sm font-medium text-gray-700">
              Check-out
            </label>
            <input
              id="checkOut"
              type="date"
              value={checkOut}
              min={checkIn || getTodayDateString()}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              aria-invalid={Boolean(errors.checkOut)}
              aria-describedby={errors.checkOut ? "checkOut-error" : undefined}
            />
            {errors.checkOut && (
              <p id="checkOut-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.checkOut}
              </p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="guests" className="mb-1 block text-sm font-medium text-gray-700">
            Guests
          </label>
          <input
            id="guests"
            type="number"
            min={1}
            max={20}
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value, 10) || 1)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={errors.guests ? "guests-error" : undefined}
          />
          {errors.guests && (
            <p id="guests-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.guests}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Search hotels
      </button>
    </form>
  );
}
