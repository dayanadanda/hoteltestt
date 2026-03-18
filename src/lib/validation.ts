const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns today's date as YYYY-MM-DD in local time (for min attributes and validation). */
export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export interface SearchFormErrors {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
}

export function validateSearchForm(
  destination: string,
  checkIn: string,
  checkOut: string,
  guests: number
): SearchFormErrors {
  const errors: SearchFormErrors = {};
  const today = getTodayDateString();

  if (!destination.trim()) {
    errors.destination = "Destination is required";
  }
  if (!checkIn) {
    errors.checkIn = "Check-in date is required";
  } else if (checkIn < today) {
    errors.checkIn = "Check-in must be today or a future date";
  }
  if (!checkOut) {
    errors.checkOut = "Check-out date is required";
  } else if (checkIn && checkOut && checkOut <= checkIn) {
    errors.checkOut = "Check-out must be after check-in";
  }
  if (guests < 1 || !Number.isInteger(guests)) {
    errors.guests = "Guests must be at least 1";
  }
  return errors;
}

export interface BookingFormErrors {
  name?: string;
  email?: string;
}

export function validateBookingForm(name: string, email: string): BookingFormErrors {
  const errors: BookingFormErrors = {};
  if (!name.trim()) {
    errors.name = "Name is required";
  }
  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Please enter a valid email address";
  }
  return errors;
}
