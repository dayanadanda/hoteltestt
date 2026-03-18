import { SearchForm } from "@/components/SearchForm";

export default function SearchPage() {
  return (
    <div className="py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Hotel Search & Booking
      </h1>
      <p className="mb-8 text-gray-600">
        Enter your destination, dates, and number of guests to find available hotels.
      </p>
      <SearchForm />
    </div>
  );
}
