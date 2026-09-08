export type Post = {
  _id: string;
  createdBy: string;
  title: string;
  description: string;
  location: string;
  accommodationType: "apartment" | "dorm" | "studio";
  totalBeds: number;
  availableBeds: number;
  monthlyRent: number;
  expenses: number;
  amenities: string[];
  rules: string;
  availableFrom: string;
  status: "ACTIVE" | "FULL" | "CLOSED";
  images: string[];
  compatibilityScore?: number | null;
};

export type PostFormData = {
  title: string;
  description: string;
  location: string;
  accommodationType: "apartment" | "dorm" | "studio";
  totalBeds: number;
  availableBeds: number;
  monthlyRent: number;
  expenses: number;
  amenities: string[];
  rules: string;
  availableFrom: string;
  images: File[];
};