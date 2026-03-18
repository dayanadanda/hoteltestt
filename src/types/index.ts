export interface Hotel {
  id: string;
  name: string;
  destination: string;
  imageUrl: string;
  starRating: number;
  pricePerNight: number;
  amenities?: string[];
}

export interface SearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface BookingFormData {
  name: string;
  email: string;
}

export interface BookingSummary {
  hotel: Hotel;
  searchParams: SearchParams;
  guestName: string;
  guestEmail: string;
  confirmationId: string;
}

export type SortOption = "price_asc" | "price_desc" | "rating_desc";
