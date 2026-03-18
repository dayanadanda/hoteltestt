# Hotel Search & Booking Prototype

A simple hotel search and booking web application with three core screens: search, results (with sort/filter), and booking detail with confirmation. Built with Next.js 14, TypeScript, and Tailwind CSS. Uses mock data (26 hotels across several European cities).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

**Option A — Connect GitHub (recommended)**

1. Push this repo to a public GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
3. Import the repository. Vercel will detect Next.js; keep the default build command (`npm run build`) and leave environment variables empty.
4. Click **Deploy**. When it finishes, copy the live URL and add it below.

**Option B — Deploy from CLI**

1. Log in: `npx vercel login` (follow the browser prompt).
2. From the project root: `npx vercel --prod` to deploy to production.
3. Copy the URL Vercel prints and add it below.

**Live URL:** _(Paste your Vercel deployment URL here, e.g. `https://hotel-search-booking-xxx.vercel.app`.)_

## Features

- **Search:** Destination (city), check-in/check-out dates, number of guests. Validation and URL-based navigation to results.
- **Results:** Filtered hotel list with photo, name, star rating, price per night. Sort by price (low/high) or rating (high).
- **Booking:** Hotel summary plus guest name and email. No real payment; submit leads to a confirmation screen with a confirmation number.
- **Confirmation:** Thank-you message and full booking summary (stored in session for the prototype).

## Tech stack

- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS
- Mock data in `src/data/hotels.ts` (no backend/DB)

## AI / vibe-coding tools

This project was built with **Cursor** (AI-assisted editing and generation). The approach that worked best was to follow a written plan: define the app structure (routes, data layer, components), then implement screen-by-screen with clear types and validation from the start. Prompts were used to generate the Next.js scaffold, mock hotel data, form validation, and individual components (SearchForm, HotelCard, BookingForm, etc.), with explicit instructions to use TypeScript, semantic HTML, and Tailwind. Tradeoffs made to ship within the time constraint: (1) no real availability or date-range logic — search filters by destination only; (2) confirmation data is stored in `sessionStorage` so it does not survive a new tab or refresh on the confirmation page; (3) minimal dependencies (no date picker library, no UI component library) to keep the bundle small and the flow easy to review.
