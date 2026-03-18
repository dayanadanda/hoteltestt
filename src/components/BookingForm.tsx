"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { validateBookingForm } from "@/lib/validation";
import type { BookingFormErrors } from "@/lib/validation";
import { saveBookingToHistory } from "@/lib/bookingHistory";
import type { Hotel } from "@/types";
import type { SearchParams } from "@/types";
import type { BookingSummary as BookingSummaryType } from "@/types";

const CONFIRMATION_STORAGE_KEY = "hotel_booking_confirmation";

function generateConfirmationId(): string {
  // Use secure randomness so each reservation gets a unique ID.
  const c: Crypto | undefined = globalThis.crypto;
  if (c && typeof c.getRandomValues === "function") {
    if ("randomUUID" in c && typeof c.randomUUID === "function") {
      return `BK-${c.randomUUID()}`;
    }
    const arr = new Uint32Array(2);
    c.getRandomValues(arr);
    return `BK-${arr[0].toString(16)}-${arr[1].toString(16)}`;
  }

  return `BK-${Date.now()}-${Math.floor(Math.random() * 1_000_000_000)}`;
}

function saveBookingToSession(booking: BookingSummaryType): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(CONFIRMATION_STORAGE_KEY, JSON.stringify(booking));
  } catch {
    // ignore
  }
}

export function getConfirmationFromSession(): BookingSummaryType | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CONFIRMATION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BookingSummaryType;
  } catch {
    return null;
  }
}

interface BookingFormProps {
  hotel: Hotel;
  searchParams: SearchParams;
}

export function BookingForm({ hotel, searchParams }: BookingFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const formErrors = validateBookingForm(name, email);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }
      setErrors({});
      setIsSubmitting(true);
      try {
        const confirmationId = generateConfirmationId();
        const booking: BookingSummaryType = {
          hotel,
          searchParams,
          guestName: name.trim(),
          guestEmail: email.trim(),
          confirmationId,
        };
        saveBookingToSession(booking);
        saveBookingToHistory(booking);
        router.push("/confirmation");
      } catch (err) {
        console.error(err);
        setErrors({ email: "Something went wrong. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    },
    [name, email, hotel, searchParams, router]
  );

  const resultsQuery = new URLSearchParams({
    destination: searchParams.destination,
    checkIn: searchParams.checkIn,
    checkOut: searchParams.checkOut,
    guests: String(searchParams.guests),
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      noValidate
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Your details
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="booking-name" className="mb-1 block text-sm font-medium text-gray-700">
            Full name
          </label>
          <input
            id="booking-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "booking-name-error" : undefined}
            autoComplete="name"
          />
          {errors.name && (
            <p id="booking-name-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="booking-email" className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="booking-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "booking-email-error" : undefined}
            autoComplete="email"
          />
          {errors.email && (
            <p id="booking-email-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? "Confirming…" : "Confirm reservation"}
        </button>
        <a
          href={`/results?${resultsQuery.toString()}`}
          className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-center font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Back to results
        </a>
      </div>
    </form>
  );
}
