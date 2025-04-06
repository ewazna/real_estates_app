import { Property } from "../../models";
import { createFigure } from "../../shared/gallery/create-figure";

export function updatePropertiesList(
  properties: Property[],
  currentPage: number,
) {
  const list = document.querySelector(".list-container") as HTMLElement;
  const firstPropertyIndex = currentPage * 10 - 10;
  const lastPropertyIndex = currentPage * 10;
  const currentProperties = properties.slice(
    firstPropertyIndex,
    lastPropertyIndex,
  );

  if (properties.length === 0) {
    list.replaceChildren(createEmptyState());
  } else {
    const figures = currentProperties.map((property) => createFigure(property));
    list.replaceChildren(...figures);
  }
}

function createEmptyState(): HTMLDivElement {
  const container = document.createElement("div");
  const emptyImage = document.createElement("img");
  const emptyStateText = document.createElement("p");

  container.style.height = "100%";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.justifyContent = "center";

  emptyImage.setAttribute("src", "/icons/empty_state.svg");
  emptyImage.style.width = "150px";
  emptyImage.style.alignSelf = "center";

  emptyStateText.innerHTML =
    "No real estates found.<br/>Try adjusting your search criteria.";
  emptyStateText.style.fontSize = "1.2rem";
  emptyStateText.style.textAlign = "center";

  container.append(emptyImage, emptyStateText);
  return container;
}

export function clearPropertiesList(): void {
  const list = document.querySelector(".list-container") as HTMLElement;
  list.replaceChildren();
}
