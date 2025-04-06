import { Category } from "./category-enum";
import { RangeFilter } from "./range-filter";
import { UsagePurpose } from "./usage-purpose-enum";

export interface PropertyFilters {
  usage: UsagePurpose;
  category: Category[];
  location: string[];
  size: RangeFilter;
  price: RangeFilter;
}
