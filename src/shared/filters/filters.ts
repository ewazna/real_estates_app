import {
  BrowsingConfig,
  Category,
  PropertyFilters,
  PropertySorting,
  RangeFilter,
  UsagePurpose,
  Region,
} from "../../models";
import { createChip } from "./create-chip";
import { createSlider } from "./create-slider";
import { createSubsection } from "./create-subsection";

const MIN_PRICE = 0;
const MAX_PRICE_FOR_BUY = 500_000;
const MAX_PRICE_FOR_RENT = 5_000;

const MIN_SIZE = 30;
const MAX_SIZE = 500;

const LOCATIONS: Partial<Record<Region, string[]>> = {
  [Region.LONDON]: ["London"],
  [Region.WALES]: ["Cardiff"],
  [Region.SCOTLAND]: ["Glasgow", "Edinburgh"],
  [Region.NORTHERN_ENGLAND]: [
    "Sheffield",
    "Manchester",
    "Newcastle",
    "Leeds",
    "Bradford",
    "Liverpool",
  ],
  [Region.CENTRAL_ENGLAND]: ["Leicester", "Birmingham", "Nottingham"],
  [Region.WEST_ENGLAND]: ["Bristol"],
};

const DEFAULT_SORTING: PropertySorting = PropertySorting.NAME_ASC;
const DEFAULT_FILTERS: PropertyFilters = {
  usage: UsagePurpose.BUY,
  category: [],
  location: [],
  size: {},
  price: {},
};

const DEFAULT_BROWSING_CONFIG: BrowsingConfig = {
  filters: DEFAULT_FILTERS,
  sorting: DEFAULT_SORTING,
};

function readConfig(): BrowsingConfig {
  return {
    filters: readFilters(),
    sorting: readSorting(),
  };
}

function readFilters(): PropertyFilters {
  return {
    usage: readUsagePurpose(),
    category: readCategories(),
    location: readLocations(),
    size: readSize(),
    price: readPrice(),
  };
}

function setConfig(config: BrowsingConfig): void {
  writeSorting(config.sorting);
  writeUsage(config.filters.usage);
  writeCategory(config.filters.category);
  writeLocation(config.filters.location);
  writePrice(config.filters.price);
  writeSize(config.filters.size);
}

function writeSize(price: RangeFilter): void {
  const rangeInput = document.querySelector(
    `#size-section .slider`,
  ) as HTMLInputElement;
  const rangeTo = document.querySelector(
    `#size-section .range-to`,
  ) as HTMLInputElement;
  rangeInput.value = price.to?.toString() || rangeInput.max;
  rangeTo.innerText = `${rangeInput.value}m2`;
}

function writePrice(price: RangeFilter): void {
  const rangeInput = document.querySelector(
    `#price-section .slider`,
  ) as HTMLInputElement;
  const rangeTo = document.querySelector(
    `#price-section .range-to`,
  ) as HTMLInputElement;
  rangeInput.value = price.to?.toString() || rangeInput.max;
  rangeTo.innerText = `$${rangeInput.value}`;
}

function writeCategory(category: string[]): void {
  document.querySelectorAll(`#category-section .chip`).forEach((chip) => {
    if (category.includes(chip.textContent as string)) {
      chip.classList.add("on");
    } else {
      chip.classList.remove("on");
    }
  });
}

function writeLocation(location: string[]): void {
  document.querySelectorAll(`#location-section .chip`).forEach((chip) => {
    if (location.includes(chip.textContent as string)) {
      chip.classList.add("on");
    } else {
      chip.classList.remove("on");
    }
  });
}

function writeSorting(sorting: PropertySorting): void {
  (
    document.querySelector(
      `#sorting-section input[value=${sorting}]`,
    ) as HTMLInputElement
  ).checked = true;
}

function writeUsage(usage: UsagePurpose): void {
  (
    document.querySelector(
      `#usage-section input[value=${usage}]`,
    ) as HTMLInputElement
  ).checked = true;
}

function readSorting(): PropertySorting {
  return (
    document.querySelector("#sorting-section input:checked") as HTMLInputElement
  ).value as PropertySorting;
}

function readCategories(): Category[] {
  return Array.from(
    document.querySelectorAll("#category-section .chip.on"),
  ).map((element) => element.textContent as Category);
}

function readLocations(): string[] {
  return Array.from(
    document.querySelectorAll("#location-section .chip.on"),
  ).map((element) => element.textContent as string);
}

function readPrice(): RangeFilter {
  return {
    from: MIN_PRICE,
    to: (document.querySelector("#price-section .slider") as HTMLInputElement)
      .valueAsNumber,
  };
}

function readSize(): RangeFilter {
  return {
    from: MIN_SIZE,
    to: (document.querySelector("#size-section .slider") as HTMLInputElement)
      .valueAsNumber,
  };
}

function readUsagePurpose(): UsagePurpose {
  return (
    document.querySelector("#usage-section input:checked") as HTMLInputElement
  ).value as UsagePurpose;
}

export function initializeFiltersAndSortingDialog(
  callback: (config: BrowsingConfig) => void,
): void {
  const dialog = document.querySelector("#filters-dialog") as HTMLDialogElement;
  const dismiss = document.querySelector(
    "#filters-dialog-dismiss",
  ) as HTMLDialogElement;
  const clear = document.querySelector(
    "#filters-dialog-clear",
  ) as HTMLDialogElement;
  const apply = document.querySelector(
    "#filters-dialog-apply",
  ) as HTMLDialogElement;

  dismiss.addEventListener("click", () => {
    dialog.close("dismiss");
  });

  clear.addEventListener("click", () => {
    dialog.close("clear");
  });

  apply.addEventListener("click", () => {
    dialog.close("apply");
  });

  dialog.addEventListener("close", () => {
    if (dialog.returnValue === "clear") {
      callback(DEFAULT_BROWSING_CONFIG);
    }

    if (dialog.returnValue === "apply") {
      callback(readConfig());
    }
  });

  createCategoryChips();
  createLocations();
  createPriceFilter();
  createSizeFilter();
  installSectionsToggling();
  installPriceRangeChanging();
}

export function showFiltersAndSortingDialog(config: BrowsingConfig) {
  setConfig(config);
  setPriceRangeAccordingToUsage();

  const dialog = document.querySelector("#filters-dialog") as HTMLDialogElement;
  dialog.showModal();
}

function createCategoryChips(): void {
  const container = document.querySelector("#category-chips .chips-container");
  container?.replaceChildren(
    ...Object.values(Category).map((value) => createChip(value)),
  );
}

function createLocations(): void {
  const container = document.querySelector("#location-chips");
  container?.replaceChildren(
    ...Object.values(Region)
      .filter((region) => !!LOCATIONS[region])
      .map((value) => createLocation(value)),
  );
}

function createLocation(region: Region): HTMLElement {
  const locations = LOCATIONS[region]!;

  const locationChipsContainer = document.createElement("div");
  locationChipsContainer.classList.add("chips-container");
  createLocationChips(locationChipsContainer, locations);

  return createSubsection(region, locationChipsContainer);
}

function createLocationChips(
  container: HTMLElement,
  locations: string[],
): void {
  container.replaceChildren(...locations.map((value) => createChip(value)));
}

function createPriceFilter(): void {
  const container = document.querySelector("#price-section .section-content");
  container?.appendChild(
    createSlider(
      MIN_PRICE,
      MAX_PRICE_FOR_BUY,
      MAX_PRICE_FOR_BUY,
      (value) => `$${value}`,
    ),
  );
}

function createSizeFilter(): void {
  const container = document.querySelector("#size-section .section-content");
  container?.appendChild(
    createSlider(MIN_SIZE, MAX_SIZE, MAX_SIZE, (value) => `${value}m2`),
  );
}

function installSectionsToggling(): void {
  document.querySelectorAll("section.section").forEach((section) => {
    const content = section.querySelector(".section-content") as HTMLElement;
    const toggle = section.querySelector(".section-toggle") as HTMLElement;

    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      content.classList.toggle("open");
    });
  });
}

function installPriceRangeChanging(): void {
  const radioButtons = document.querySelectorAll("#usage-section input");
  radioButtons.forEach((radio) =>
    radio.addEventListener("change", () => {
      setPriceRangeAccordingToUsage();
    }),
  );
}

function setPriceRangeAccordingToUsage(): void {
  const usage = readUsagePurpose();
  const rangeTo = document.querySelector(
    "#price-section .range-to",
  ) as HTMLParagraphElement;
  const slider = document.querySelector(
    "#price-section .slider",
  ) as HTMLInputElement;
  if (usage === UsagePurpose.BUY) {
    rangeTo.textContent = `$${MAX_PRICE_FOR_BUY}`;
    slider.max = MAX_PRICE_FOR_BUY.toString();
  } else {
    rangeTo.textContent = `$${MAX_PRICE_FOR_RENT}`;
    slider.max = MAX_PRICE_FOR_RENT.toString();
  }
}
