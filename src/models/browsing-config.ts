import { PropertyFilters } from "./property-filters";
import { PropertySorting } from "./property-sorting";

export interface BrowsingConfig {
  filters: PropertyFilters;
  sorting: PropertySorting;
}
