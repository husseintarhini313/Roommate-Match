export type BrowseFilters = {
  location: string;
  accommodationType: string;
  maxRent: number | null;
  minBeds: number;
  amenities: string[];
};

export const EMPTY_FILTERS: BrowseFilters = {
  location: "",
  accommodationType: "",
  maxRent: null,
  minBeds: 1, 
  amenities: [],
};