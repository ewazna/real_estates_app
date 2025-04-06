import { Property } from "../../models";
import { updateShowImage } from "./update-show-image";

export function handleImageSlider(property: Property): void {
  let currentImageIndex = 0;
  const lastIndex = property.photos.length - 1;

  const buttons = document.querySelector(
    ".buttons-container",
  ) as HTMLDivElement;
  const leftButton = buttons.firstElementChild as HTMLButtonElement;
  const rightButton = buttons.lastElementChild as HTMLButtonElement;

  if (!leftButton || !rightButton) {
    return;
  }

  leftButton.addEventListener("click", () => {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      updateShowImage(property, currentImageIndex);
      updateButtonVisibility(currentImageIndex);
    }
  });

  rightButton.addEventListener("click", () => {
    if (currentImageIndex < lastIndex) {
      currentImageIndex++;
      updateShowImage(property, currentImageIndex);
      updateButtonVisibility(currentImageIndex);
    }
  });

  function updateButtonVisibility(currentImageIndex: number): void {
    if (!leftButton || !rightButton) {
      return;
    }

    leftButton.style.visibility =
      currentImageIndex === 0 ? "hidden" : "visible";
    rightButton.style.visibility =
      currentImageIndex === lastIndex ? "hidden" : "visible";
  }

  updateShowImage(property, currentImageIndex);
  updateButtonVisibility(currentImageIndex);
}
