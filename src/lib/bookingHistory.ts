import type { BookingSummary } from "@/types";

const BOOKINGS_STORAGE_KEY = "hotel_bookings";

export function saveBookingToHistory(booking: BookingSummary): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    const list: BookingSummary[] = raw ? (JSON.parse(raw) as BookingSummary[]) : [];
    list.unshift(booking);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export function getBookingHistory(): BookingSummary[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as BookingSummary[];
  } catch {
    return [];
  }
}
