import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../../../../mocks/api";
import type { Country } from "../types/types";

export function useCountriesQuery() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    select: (raw: unknown): Country[] =>
      Array.isArray(raw)
        ? raw.map((r: any) => ({
            name: String(r?.name ?? ""),
            code: String(r?.code ?? ""),
            postalCodeRegex: String(r?.postalCodeRegex ?? ".*"),
            cities: Array.isArray(r?.cities)
              ? r.cities.map((c: any) => String(c))
              : [],
          }))
        : [],
    staleTime: 10 * 60 * 1000,
  });
}
