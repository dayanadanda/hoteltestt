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
  const [isSearching, setIsSearching] = useState(false);

  const MIN_GUESTS = 1;
  const MAX_GUESTS = 20;

  const clampGuests = (value: number): number => {
    if (!Number.isFinite(value)) return MIN_GUESTS;
    return Math.min(MAX_GUESTS, Math.max(MIN_GUESTS, Math.trunc(value)));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (isSearching) return;
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
      setIsSearching(true);

      // Ensure the "Searching…" state paints before Next navigates away.
      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => resolve());
      });

      const params = new URLSearchParams({
        destination: destination.trim(),
        checkIn,
        checkOut,
        guests: String(guests),
      });

      router.push(`/results?${params.toString()}`);
    },
    [destination, checkIn, checkOut, guests, isSearching, router]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      noValidate
      aria-busy={isSearching}
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
          <div className="flex items-stretch gap-2">
            <button
              type="button"
              onClick={() => setGuests((g) => clampGuests(g - 1))}
              disabled={isSearching || guests <= MIN_GUESTS}
              aria-label="Decrease guests"
              className="flex w-11 items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              −
            </button>
            <input
              id="guests"
              inputMode="numeric"
              type="number"
              min={MIN_GUESTS}
              max={MAX_GUESTS}
              step={1}
              value={guests}
              onChange={(e) => {
                const nextRaw = Number.parseInt(e.target.value, 10);
                setGuests(Number.isNaN(nextRaw) ? MIN_GUESTS : clampGuests(nextRaw));
              }}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-center text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              aria-invalid={Boolean(errors.guests)}
              aria-describedby={errors.guests ? "guests-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setGuests((g) => clampGuests(g + 1))}
              disabled={isSearching || guests >= MAX_GUESTS}
              aria-label="Increase guests"
              className="flex w-11 items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              +
            </button>
          </div>
          {errors.guests && (
            <p id="guests-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.guests}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={isSearching}
        className="mt-6 w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isSearching ? "Searching…" : "Search hotels"}
      </button>
    </form>
  );
}
