import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-lg font-semibold text-gray-900 hover:text-gray-700"
        >
          Hotel Search
        </Link>
        <nav>
          <Link
            href="/bookings"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            My bookings
          </Link>
        </nav>
      </div>
    </header>
  );
}
