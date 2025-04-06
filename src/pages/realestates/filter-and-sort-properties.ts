import { Property, BrowsingConfig, PropertySorting } from "../../models";

export function filterAndSortProperties(
  allProperties: Property[],
  config: BrowsingConfig,
  searchTerm: string,
): Property[] {
  return allProperties
    .filter((property) => {
      const { usage, category, price, size, location } = config.filters;

      const usageCheck = property.usage === usage;
      const categoryCheck =
        (category || []).length > 0
          ? category?.includes(property.category)
          : true;
      const locationCheck =
        (location || []).length > 0
          ? location?.includes(property.location)
          : true;
      const priceCheck = price.to
        ? price.from! <= property.price && price.to! >= property.price
        : true;
      const sizeCheck = size.to
        ? size.from! <= property.size && size.to! >= property.size
        : true;
      const searchTermCheck = searchTerm.toLocaleLowerCase()
        ? property.name.toLocaleLowerCase().match(searchTerm) ||
          property.address.toLocaleLowerCase().match(searchTerm)
        : true;

      return (
        usageCheck &&
        categoryCheck &&
        locationCheck &&
        priceCheck &&
        sizeCheck &&
        searchTermCheck
      );
    })
    .sort((a, b) => {
      const sorting = config.sorting;
      switch (sorting) {
        case PropertySorting.PRICE_ASC:
          return a.price - b.price;
        case PropertySorting.PRICE_DESC:
          return b.price - a.price;
        case PropertySorting.NAME_DESC:
          return b.name.localeCompare(a.name);
        case PropertySorting.NAME_ASC:
        default:
          return a.name.localeCompare(b.name);
      }
    });
}
