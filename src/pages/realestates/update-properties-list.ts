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
  const figures = currentProperties.map((property) => createFigure(property));
  list.replaceChildren(...figures);
}

export function clearPropertiesList(): void {
  const list = document.querySelector(".list-container") as HTMLElement;
  list.replaceChildren();
}
