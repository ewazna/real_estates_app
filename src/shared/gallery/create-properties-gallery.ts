import { Property } from "../../models";
import { fetchProperties } from "../fetch-data";
import { calculateNumberOfVisibleCards } from "./calculate-number-of-cards";
import { updatePropertiesGalleryView } from "./update-properties-gallery-view";

export const IMAGE_WIDTH = 300;
export const IMAGE_GAP = 16;

export async function createPropertiesGallery(): Promise<void> {
  const properties: Property[] = await fetchProperties();
  const totalProperties = properties.length;
  const numberOfVisibleProperties = calculateNumberOfVisibleCards(
    IMAGE_WIDTH,
    IMAGE_GAP,
  );

  let firstVisibleIndex = 0;

  function updateGallery(): void {
    let visibleProperties;
    if (firstVisibleIndex + numberOfVisibleProperties > totalProperties) {
      visibleProperties = [
        ...properties.slice(firstVisibleIndex),
        ...properties.slice(
          0,
          firstVisibleIndex + numberOfVisibleProperties - totalProperties,
        ),
      ];
    } else {
      visibleProperties = properties.slice(
        firstVisibleIndex,
        firstVisibleIndex + numberOfVisibleProperties,
      );
    }

    updatePropertiesGalleryView(visibleProperties);
  }

  function installArrowListeners(): void {
    const [arrowLeft, arrowRright] = document.querySelectorAll(
      ".buttons-container .link-btn.link-btn-icon.gallery-arrow",
    );

    arrowLeft.addEventListener("click", () => {
      firstVisibleIndex--;
      if (firstVisibleIndex < 0) {
        firstVisibleIndex = totalProperties - 1;
      }
      updateGallery();
    });

    arrowRright.addEventListener("click", () => {
      firstVisibleIndex++;
      if (firstVisibleIndex > totalProperties - 1) {
        firstVisibleIndex = 0;
      }
      updateGallery();
    });
  }

  updateGallery();
  installArrowListeners();
}
