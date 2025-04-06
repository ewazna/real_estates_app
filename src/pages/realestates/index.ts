import { fetchProperties } from "../../shared/fetch-data";
import { handleSubnavigation } from "../../shared/navigation/handle-subnavigation";
import { adjustNavigation } from "../../shared/navigation/adjust-navigation";
import { buildPages } from "./handle-pagination";
import {
  initializeFiltersAndSortingDialog,
  showFiltersAndSortingDialog,
} from "../../shared/filters";
import { BrowsingConfig, PropertySorting } from "../../models";
import {
  resolveQueryParams,
  updateQueryParam,
} from "../../shared/utils/query-params";
import { filterAndSortProperties } from "./filter-and-sort-properties";
import { validateUsageQuery } from "./validate-usage-param";
import { indicateNavigationButton } from "../../shared/navigation";
import { handleBackNavigation } from "../../shared/utils/handle-back-navigation";

async function renderPage(): Promise<void> {
  const properties = await fetchProperties();

  const params = resolveQueryParams();
  const initialUsage = validateUsageQuery(params);
  const initialSearch = params.has("search")
    ? (params.get("search") as string)
    : "";
  const initialPage = 1;

  let currentConfig: BrowsingConfig = {
    sorting: PropertySorting.NAME_ASC,
    filters: {
      usage: initialUsage,
      category: [],
      location: [],
      price: {},
      size: {},
    },
  };

  let currentSearchTerm = initialSearch;
  writeToSearch(currentSearchTerm);

  let filteredAndSortedProperties = filterAndSortProperties(
    properties,
    currentConfig,
    currentSearchTerm,
  );

  function applyFiltersAndSorting(config: BrowsingConfig): void {
    currentConfig = structuredClone(config);
    updateQueryParam("usage", currentConfig.filters.usage);
    filteredAndSortedProperties = filterAndSortProperties(
      properties,
      currentConfig,
      currentSearchTerm,
    );
    buildPages(filteredAndSortedProperties, initialPage);
  }

  listenToSearch((term) => {
    currentSearchTerm = term;
    updateQueryParam("search", term);
    filteredAndSortedProperties = filterAndSortProperties(
      properties,
      currentConfig,
      currentSearchTerm,
    );
    buildPages(filteredAndSortedProperties, initialPage);
  });

  initializeFiltersAndSortingDialog(applyFiltersAndSorting);
  buildPages(filteredAndSortedProperties, initialPage);

  installOpeningFiltersDialog(() => showFiltersAndSortingDialog(currentConfig));
}

function listenToSearch(callback: (term: string) => void): void {
  const search = document.querySelector("#search-input") as HTMLInputElement;
  search.addEventListener("change", () => {
    callback(search.value);
  });
}

function writeToSearch(value: string): void {
  const search = document.querySelector("#search-input") as HTMLInputElement;
  search.value = value;
}

function installOpeningFiltersDialog(callback: () => void): void {
  const trigger = document.querySelector("#open-filters") as HTMLButtonElement;
  trigger.addEventListener("click", callback);
}

renderPage();
adjustNavigation();
handleSubnavigation();
handleBackNavigation();
indicateNavigationButton();
