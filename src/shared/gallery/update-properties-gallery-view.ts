import { Property } from "../../models";
import { createFigure } from "./create-figure";
import { IMAGE_GAP, IMAGE_WIDTH } from "./create-properties-gallery";

export function updatePropertiesGalleryView(properties: Property[]): void {
  const list = document.querySelector(".gallery-container") as HTMLElement;
  const currentFigures = Array.from(
    (list.querySelectorAll("[id^=property_]") || []) as NodeListOf<HTMLElement>,
  );
  const currentFigureIds = currentFigures.map(
    (figure) => figure.id.split("_")[1],
  );
  const propertyIds = properties.map((property) => property.id);

  const newProperties = properties.filter(
    (property) => !currentFigureIds.includes(property.id),
  );

  const toRemoveFigures = currentFigures.filter(
    (figure) => !propertyIds.includes(figure.id.split("_")[1]),
  );

  if (newProperties.length > 1) {
    const figures = properties.map((property) => createFigure(property));
    list.replaceChildren(...figures);
  } else {
    const newProperty = newProperties[0];
    const newPropertyIdx = properties.indexOf(newProperty);
    const figureToAdd = createFigure(newProperty);
    const figureToRemove = toRemoveFigures[0];

    const distance = IMAGE_WIDTH / 2 + IMAGE_GAP;

    function moveGallery(direction: 1 | -1): void {
      if (direction > 0) {
        list.append(figureToAdd);
      } else {
        list.prepend(figureToAdd);
      }

      list.style.transform = "translateX(" + distance * direction + "px)";

      setTimeout(() => {
        list.style.transition = "transform 200ms";
        list.style.transform =
          "translateX(" + distance * direction * -1 + "px)";

        setTimeout(() => {
          list.style.transition = "";
          list.style.transform = "translateX(0)";
          list.removeChild(figureToRemove);
        }, 200);
      }, 0);
    }

    if (newPropertyIdx === 0) {
      moveGallery(-1);
    } else {
      moveGallery(1);
    }
  }
}
