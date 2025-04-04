import { Property } from "../../models";

export function createFigure(property: Property): HTMLElement {
  const figure = document.createElement("figure");
  figure.id = "property_" + property.id;
  figure.classList.add("property-container");
  figure.addEventListener("click", () => {
    window.location.href = `/realestates/${property.id}/`;
  });

  const image = document.createElement("img");
  image.classList.add("property-image");
  image.setAttribute("src", property.photos[0]);

  const info = document.createElement("figcaption");
  info.classList.add("property-info");

  const title: HTMLParagraphElement = document.createElement("p");
  title.textContent = property.name;

  const address: HTMLParagraphElement = document.createElement("p");
  address.textContent = property.address;

  const price: HTMLSpanElement = document.createElement("span");
  price.classList.add("price-tag");
  price.textContent = `$${property.price}`;

  const tags = document.createElement("div");
  tags.classList.add("tags-container");

  const size = document.createElement("div");
  size.classList.add("tag");
  size.innerHTML = `${property.size}m<sup>2</sup>`;

  const bedrooms: HTMLDivElement = document.createElement("div");
  bedrooms.classList.add("tag");
  bedrooms.textContent = `${property.bedrooms}`;

  const sizeIcon = document.createElement("img");
  sizeIcon.classList.add("icon-30", "tag-icon");
  sizeIcon.setAttribute("src", "/icons/size.svg");

  const bedIcon = document.createElement("img");
  bedIcon.classList.add("icon-30", "tag-icon");
  bedIcon.setAttribute("src", "/icons/bed.svg");

  size.prepend(sizeIcon);
  bedrooms.prepend(bedIcon);
  tags.append(size);
  tags.append(bedrooms);
  info.append(title);
  info.append(address);
  figure.append(image);
  figure.append(info);
  figure.append(price);
  figure.append(tags);

  return figure;
}
