import { fetchProperties } from "../../../shared/fetch-data";
import { handleImageSlider } from "../../../shared/image-slider/handle-image-slider";
import {
  adjustNavigation,
  handleSubnavigation,
  indicateNavigationButton,
} from "../../../shared/navigation";
import { handleBackNavigation } from "../../../shared/utils/handle-back-navigation";
import { generatePropertyDetails } from "./generate-property-details";

async function renderPage() {
  const splittedPath = window.location.pathname.split("/");
  const propertyId = splittedPath[splittedPath.length - 1];
  const property = (await fetchProperties()).filter((property) => {
    return property.id === propertyId;
  })[0];

  handleImageSlider(property);
  generatePropertyDetails(property);
  handleBackNavigation();
  adjustNavigation();
  handleSubnavigation();
  indicateNavigationButton();
}

renderPage();
