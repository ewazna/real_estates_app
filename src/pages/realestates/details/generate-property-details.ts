import { Amenity } from "../../../models/amenities-enum";
import { Property } from "../../../models/property";
import { generateAmenity } from "./generate-amenity";
import { generateMapSrc } from "./generate-map-src";

const ALEX_PHONE_NUMBER = "+44 567 283 222";
const STEPHEN_PHONE_NUMBER = "+44 555 283 244";

export function generatePropertyDetails(property: Property) {
  const price = document.querySelector(".price") as HTMLSpanElement;
  price.textContent = `$${property.price}`;

  const title = document.querySelector(".property-title") as HTMLHeadingElement;
  title.textContent = property.name;

  const address = document.querySelector(".address") as HTMLParagraphElement;
  const splitIndex = property.address.indexOf(", ");
  const firstLineAddress = property.address.slice(0, splitIndex);
  const secondLineAddress = property.address.slice(splitIndex + 1);
  address.innerHTML = `${firstLineAddress}<br/> ${secondLineAddress}`;

  const map = document.querySelector(".map") as HTMLIFrameElement;
  const mapSrc = generateMapSrc(
    property.coordinates[0],
    property.coordinates[1],
  );
  map.setAttribute("src", mapSrc);

  const tags = document.querySelectorAll(".tags-container span");
  tags[0].textContent = `${property.bedrooms}`;
  tags[1].textContent = `${property.bathrooms}`;
  tags[2].innerHTML = `${property.size}m<sup>2</sup>`;

  const description = document.querySelector(
    ".description",
  ) as HTMLParagraphElement;
  description.innerHTML = property.description;

  const amenitiesContainer = document.querySelector(".amenities-container");
  const amenities: Amenity[] = Object.entries(property.amenities)
    .filter((amenity) => amenity[1])
    .map((amenity) => amenity[0] as Amenity);

  const generatedAmenities = amenities.map((amenity) => {
    return generateAmenity(amenity);
  });

  amenitiesContainer?.append(...generatedAmenities);

  const agent = document.querySelector(".agent-name") as HTMLParagraphElement;
  agent.textContent = property.agent;

  const phoneNumber = document.querySelector(".phone") as HTMLParagraphElement;
  if (property.agent === "Alex") {
    phoneNumber.textContent = ALEX_PHONE_NUMBER;
  } else if (property.agent === "Stephen") {
    phoneNumber.textContent = STEPHEN_PHONE_NUMBER;
  }
}
