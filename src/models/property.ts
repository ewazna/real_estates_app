import { Amenity } from "./amenities-enum";
import { Category, UsagePurpose } from "./index";

export interface Property {
  id: string;
  name: string;
  agent: string;
  address: string;
  location: string;
  coordinates: [number, number];
  usage: UsagePurpose;
  category: Category;
  size: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  amenities: { [key in Amenity]: boolean };
  photos: string[];
  description: string;
}
