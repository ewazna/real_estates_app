import { Category } from "./index";

export type Amenities =
  | "petsAllowed"
  | "thermostat"
  | "dishwasher"
  | "balcony"
  | "AC"
  | "energySaving"
  | "garage"
  | "babyBedroom"
  | "fireplace";

export interface Property {
  id: string;
  name: string;
  address: string;
  type: "rent" | "buy";
  category: Category;
  size: number;
  price: number;
  bedrooms: number;
  amenities: { [key in Amenities]: boolean };
  photos: string[];
  description: string;
}
