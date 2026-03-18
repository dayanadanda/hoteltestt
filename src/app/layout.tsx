import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Hotel Search & Booking",
  description: "Search and book hotels by destination, dates, and guests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        <a
          href="#main"
          className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:block focus:rounded focus:bg-blue-600 focus:px-3 focus:py-2 focus:text-white focus:outline-none"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="container mx-auto max-w-6xl px-4 py-6" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
