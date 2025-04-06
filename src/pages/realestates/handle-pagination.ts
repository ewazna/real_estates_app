import { Property } from "../../models";
import { createLoader } from "../../shared/loader/loader";
import { updatePageInfo } from "./update-page-info";
import {
  clearPropertiesList,
  updatePropertiesList,
} from "./update-properties-list";

const PROPERTIES_PER_PAGE = 10;

export function buildPages(properties: Property[], initialPage: number) {
  const numberOfProperties = properties.length;
  const lastPage = Math.ceil(numberOfProperties / PROPERTIES_PER_PAGE);

  let currentPage = initialPage;

  const firstPageBtn = document.querySelector(
    "#first-page-btn",
  ) as HTMLButtonElement;
  const previousPageBtn = document.querySelector(
    "#previous-page-btn",
  ) as HTMLButtonElement;
  const nextPageBtn = document.querySelector(
    "#next-page-btn",
  ) as HTMLButtonElement;
  const lastPageBtn = document.querySelector(
    "#last-page-btn",
  ) as HTMLButtonElement;

  const loader = createLoader(
    document.querySelector(".main-container") as HTMLElement,
  );

  firstPageBtn.addEventListener("click", () => {
    currentPage = 1;
    updateView();
  });

  previousPageBtn.addEventListener("click", () => {
    currentPage--;
    updateView();
  });

  nextPageBtn.addEventListener("click", () => {
    currentPage++;
    updateView();
  });

  lastPageBtn.addEventListener("click", () => {
    currentPage = lastPage;
    updateView();
  });

  function updateView(): void {
    clearPropertiesList();
    loader.showLoader();
    setTimeout(() => {
      loader.hideLoader();
      updatePropertiesList(properties, currentPage);
      updateButtonVisibility(currentPage);
      updatePageInfo(currentPage, properties.length);
    }, 1000);
  }

  function updateButtonVisibility(currentPage: number) {
    firstPageBtn.disabled = numberOfProperties === 0 || currentPage === 1;
    previousPageBtn.disabled = numberOfProperties === 0 || currentPage === 1;
    nextPageBtn.disabled = numberOfProperties === 0 || currentPage === lastPage;
    lastPageBtn.disabled = numberOfProperties === 0 || currentPage === lastPage;
  }

  updateView();
}
