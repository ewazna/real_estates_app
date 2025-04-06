import { Property } from "../../models";

export function updateShowImage(property: Property, imageIndex: number): void {
  const image = document.querySelector(".property-image") as HTMLElement;
  image.setAttribute("src", property.photos[imageIndex]);
}
