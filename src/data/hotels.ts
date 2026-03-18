import type { Hotel } from "@/types";
import type { SortOption } from "@/types";

export const hotels: Hotel[] = [
  {
    id: "1",
    name: "Grand Plaza Hotel",
    destination: "Paris",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    starRating: 5,
    pricePerNight: 320,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant"],
  },
  {
    id: "2",
    name: "Riverside Inn",
    destination: "Paris",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
    starRating: 4,
    pricePerNight: 180,
    amenities: ["WiFi", "Breakfast", "Bar"],
  },
  {
    id: "3",
    name: "Le Petit Château",
    destination: "Paris",
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
    starRating: 4,
    pricePerNight: 220,
    amenities: ["WiFi", "Restaurant", "Garden"],
  },
  {
    id: "4",
    name: "Metropolitan Suites",
    destination: "Paris",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
    starRating: 5,
    pricePerNight: 410,
    amenities: ["WiFi", "Pool", "Gym", "Spa", "Restaurant"],
  },
  {
    id: "5",
    name: "Central Station Hotel",
    destination: "Paris",
    imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
    starRating: 3,
    pricePerNight: 95,
    amenities: ["WiFi", "Breakfast"],
  },
  {
    id: "6",
    name: "Harbor View Hotel",
    destination: "Barcelona",
    imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
    starRating: 4,
    pricePerNight: 195,
    amenities: ["WiFi", "Pool", "Restaurant", "Beach"],
  },
  {
    id: "7",
    name: "Casa del Sol",
    destination: "Barcelona",
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    starRating: 5,
    pricePerNight: 280,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Rooftop"],
  },
  {
    id: "8",
    name: "Gothic Quarter Hostel",
    destination: "Barcelona",
    imageUrl: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800",
    starRating: 3,
    pricePerNight: 72,
    amenities: ["WiFi", "Breakfast", "Common area"],
  },
  {
    id: "10",
    name: "Ramblas Central",
    destination: "Barcelona",
    imageUrl: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
    starRating: 4,
    pricePerNight: 165,
    amenities: ["WiFi", "Bar", "Restaurant"],
  },
  {
    id: "11",
    name: "Big Ben View Hotel",
    destination: "London",
    imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac291?w=800",
    starRating: 4,
    pricePerNight: 245,
    amenities: ["WiFi", "Breakfast", "Bar", "Gym"],
  },
  {
    id: "12",
    name: "Thames Riverside",
    destination: "London",
    imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800",
    starRating: 5,
    pricePerNight: 390,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Bar"],
  },
  {
    id: "13",
    name: "Kensington Gardens Inn",
    destination: "London",
    imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
    starRating: 4,
    pricePerNight: 198,
    amenities: ["WiFi", "Breakfast", "Garden"],
  },
  {
    id: "14",
    name: "Soho House",
    destination: "London",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
    starRating: 3,
    pricePerNight: 125,
    amenities: ["WiFi", "Bar", "Restaurant"],
  },
  {
    id: "15",
    name: "Royal Westminster",
    destination: "London",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    starRating: 5,
    pricePerNight: 425,
    amenities: ["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Concierge"],
  },
  {
    id: "16",
    name: "Amsterdam Canal House",
    destination: "Amsterdam",
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    starRating: 4,
    pricePerNight: 210,
    amenities: ["WiFi", "Breakfast", "Bike rental"],
  },
  {
    id: "17",
    name: "Van Gogh Hotel",
    destination: "Amsterdam",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
    starRating: 4,
    pricePerNight: 175,
    amenities: ["WiFi", "Restaurant", "Bar"],
  },
  {
    id: "18",
    name: "Jordaan Boutique",
    destination: "Amsterdam",
    imageUrl: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800",
    starRating: 5,
    pricePerNight: 295,
    amenities: ["WiFi", "Breakfast", "Spa", "Restaurant"],
  },
  {
    id: "19",
    name: "Berlin Central",
    destination: "Berlin",
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
    starRating: 4,
    pricePerNight: 142,
    amenities: ["WiFi", "Breakfast", "Gym", "Bar"],
  },
  {
    id: "20",
    name: "East Side Gallery Hotel",
    destination: "Berlin",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
    starRating: 3,
    pricePerNight: 88,
    amenities: ["WiFi", "Bar"],
  },
  {
    id: "21",
    name: "Kreuzberg Loft",
    destination: "Berlin",
    imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
    starRating: 4,
    pricePerNight: 165,
    amenities: ["WiFi", "Breakfast", "Restaurant"],
  },
  {
    id: "22",
    name: "Rome Eternal View",
    destination: "Rome",
    imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
    starRating: 5,
    pricePerNight: 310,
    amenities: ["WiFi", "Pool", "Restaurant", "Spa"],
  },
  {
    id: "23",
    name: "Trastevere Rooms",
    destination: "Rome",
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    starRating: 4,
    pricePerNight: 155,
    amenities: ["WiFi", "Breakfast", "Bar"],
  },
  {
    id: "24",
    name: "Colosseum Inn",
    destination: "Rome",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
    starRating: 3,
    pricePerNight: 98,
    amenities: ["WiFi", "Breakfast"],
  },
  {
    id: "25",
    name: "Vienna Opera Hotel",
    destination: "Vienna",
    imageUrl: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800",
    starRating: 5,
    pricePerNight: 275,
    amenities: ["WiFi", "Restaurant", "Bar", "Spa", "Gym"],
  },
  {
    id: "26",
    name: "Belvedere Suites",
    destination: "Vienna",
    imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac291?w=800",
    starRating: 4,
    pricePerNight: 195,
    amenities: ["WiFi", "Breakfast", "Restaurant"],
  },
];

export function getHotelById(id: string): Hotel | undefined {
  return hotels.find((h) => h.id === id);
}

export function getHotelsByDestination(destination: string): Hotel[] {
  const normalized = destination.trim().toLowerCase();
  if (!normalized) return [];
  return hotels.filter(
    (h) => h.destination.toLowerCase() === normalized
  );
}

export function getUniqueDestinations(): string[] {
  const set = new Set(hotels.map((h) => h.destination));
  return Array.from(set).sort();
}

export function sortHotels(hotelsList: Hotel[], sort: SortOption): Hotel[] {
  const copy = [...hotelsList];
  switch (sort) {
    case "price_asc":
      return copy.sort((a, b) => a.pricePerNight - b.pricePerNight);
    case "price_desc":
      return copy.sort((a, b) => b.pricePerNight - a.pricePerNight);
    case "rating_desc":
      return copy.sort((a, b) => b.starRating - a.starRating);
    default:
      return copy;
  }
}
