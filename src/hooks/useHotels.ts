import { useMemo } from "react";
import {
  getHotelsByDestination,
  sortHotels,
} from "@/data/hotels";
import type { SortOption } from "@/types";

export function useHotels(
  destination: string,
  sort: SortOption = "price_asc"
) {
  return useMemo(() => {
    const filtered = getHotelsByDestination(destination);
    return sortHotels(filtered, sort);
  }, [destination, sort]);
}
